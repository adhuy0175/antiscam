/* StudentAntiscam: online-safety learning experience for high school students. */
'use strict';
(() => {
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const esc = value => String(value).replace(
  /[&<>"']/g,
  char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]),
);

function getYouTubeVideoId(value) {
  const input = String(value || '').trim();
  const validId = id => /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : null;
  if (validId(input)) return input;

  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase();
    if (host === 'youtu.be') return validId(url.pathname.split('/').filter(Boolean)[0]);

    const isYouTube = host === 'youtube.com'
      || host.endsWith('.youtube.com')
      || host === 'youtube-nocookie.com'
      || host.endsWith('.youtube-nocookie.com');
    if (!isYouTube) return null;

    const queryId = validId(url.searchParams.get('v'));
    if (queryId) return queryId;

    const pathMatch = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
    return validId(pathMatch?.[1]);
  } catch {
    const match = input.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/i);
    return validId(match?.[1]);
  }
}

function toYouTubeWatchUrl(value) {
  const videoId = getYouTubeVideoId(value);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
}

function toYouTubeEmbedUrl(value, {autoplay = false} = {}) {
  const videoId = getYouTubeVideoId(value);
  if (!videoId) return null;

  const params = new URLSearchParams({rel:'0', enablejsapi:'1'});
  if (autoplay) params.set('autoplay', '1');
  params.set('playsinline', '1');
  if (/^https?:$/.test(location.protocol) && location.origin !== 'null') {
    params.set('origin', location.origin);
  }
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

function toYouTubeThumbnailUrl(value) {
  const videoId = getYouTubeVideoId(value);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}
const {
  icon,
  lessons,
  scenarioImages,
  scenarios,
  quizSets,
  helpCases,
  sources,
  aiWarnings,
} = window.StudentAntiscamData;

function renderIcons(root = document) {
  $$('[data-icon]', root).forEach(node => {
    node.innerHTML = icon(node.dataset.icon);
    node.removeAttribute('data-icon');
  });
}

const STORAGE_KEY = 'StudentAntiscam.progress.v1';
const emptyQuizState = (selectedQuizId = null) => ({
  selectedQuizId,
  index:0,
  answers:[],
  finished:false,
});

let progress = {completed:[], best:null};
let quizState = emptyQuizState();
let currentFilter = 'all';
let warningPage = 0;
let storageAvailable = true;
let toastTimer;
let lastModalFocus = null;
let youtubeApiPromise;
let youtubePlayers = [];

const WARNING_PAGE_SIZE = 4;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;

    progress.completed = Array.isArray(saved.completed)
      ? [...new Set(saved.completed.filter(id => lessons.some(lesson => lesson.id === id)))]
      : [];
    progress.best = Number.isInteger(saved.best) && saved.best >= 0 && saved.best <= 10
      ? saved.best
      : null;
  } catch {
    storageAvailable = false;
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
    toast('Trình duyệt chưa lưu được tiến độ. Bạn vẫn có thể học trong phiên này.');
  }
  updateProgress();
  renderLessons();
}

function toast(message) {
  const toastElement = $('#toast');
  toastElement.textContent = message;
  toastElement.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastElement.hidden = true;
  }, 3500);
}
function scenarioImage(scenario, detail = false) {
  const photo = scenarioImages[scenario.id];
  const image = `<img src="${photo.src}" alt="${esc(photo.alt)}" width="1080" height="720" loading="${detail ? 'eager' : 'lazy'}" decoding="async">`;

  if (detail) {
    return `<figure class="scenario-scene">${image}<figcaption>Ảnh minh họa bằng AI · Tình huống giả lập</figcaption></figure>`;
  }

  return `<figure class="scenario-photo">${image}<figcaption class="scenario-photo-label">Tình huống giả lập · Ảnh AI</figcaption><span class="scenario-photo-message" aria-hidden="true">${esc(scenario.artSub)}</span></figure>`;
}
function scenarioCard(scenario) {
  return `<article class="scenario-card">${scenarioImage(scenario)}<div class="scenario-content"><span class="badge ${scenario.color}">${scenario.label}</span><h3>${scenario.title}</h3><p>${scenario.desc}</p><button class="text-button" data-scenario="${scenario.id}" aria-label="Thử tình huống: ${scenario.title}">Bạn sẽ làm gì? ${icon('arrow-right')}</button></div></article>`;
}

function renderLessons() {
  $('#lessonGrid').innerHTML = lessons.map((lesson, index) => {
    const done = progress.completed.includes(lesson.id);
    return `<article class="lesson-card"><div class="lesson-top"><span class="icon-tile ${lesson.color}">${icon(lesson.icon)}</span><span class="lesson-index">0${index + 1}</span></div><h3>${lesson.title}</h3><p>${lesson.desc}</p><div class="lesson-bottom"><span class="${done ? 'completed-dot' : ''}">${icon(done ? 'check-circle' : 'clock')}${done ? 'Đã học' : `${lesson.time} phút`}</span><button class="text-button" data-lesson="${lesson.id}" aria-label="Mở bài học: ${lesson.title}">${done ? 'Xem lại' : 'Vào học'} ${icon('arrow-right')}</button></div></article>`;
  }).join('');
}

function renderScenarios() {
  const visibleScenarios = scenarios.filter(
    scenario => currentFilter === 'all' || scenario.category === currentFilter,
  );
  $('#homeScenarios').innerHTML = scenarios.slice(0, 3).map(scenarioCard).join('');
  $('#allScenarios').innerHTML = visibleScenarios.map(scenarioCard).join('');
}

function warningVideoErrorFallback(item) {
  const watchUrl = toYouTubeWatchUrl(item.videoUrl);
  const thumbnailUrl = toYouTubeThumbnailUrl(item.videoUrl);
  if (!watchUrl || !thumbnailUrl) {
    return '<div class="warning-video-unavailable">Video không khả dụng</div>';
  }

  return `
    <a class="warning-video-fallback" href="${watchUrl}" target="_blank" rel="noopener noreferrer" aria-label="Xem video ${esc(item.videoTitle)} trên YouTube">
      <img src="${thumbnailUrl}" alt="" width="480" height="360" loading="lazy" decoding="async">
      <span class="warning-video-fallback-button">${icon('external')} Xem trên YouTube</span>
    </a>
  `;
}

function warningVideoPlayer(item, warningIndex, {autoplay = false} = {}) {
  const embedUrl = toYouTubeEmbedUrl(item.videoUrl, {autoplay});
  if (!embedUrl) return warningVideoErrorFallback(item);

  return `
    <iframe
      id="warning-player-${warningIndex}"
      src="${embedUrl}"
      title="${esc(item.videoTitle)}"
      width="100%"
      height="100%"
      frameborder="0"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  `;
}

function showWarningVideoFallback(wrapper, item) {
  if (!wrapper?.isConnected || wrapper.classList.contains('is-fallback')) return;
  wrapper.classList.add('is-fallback');
  wrapper.innerHTML = warningVideoErrorFallback(item);
}

function destroyYouTubePlayers() {
  youtubePlayers.forEach(player => {
    try { player.destroy(); } catch {}
  });
  youtubePlayers = [];
}

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReadyHandler === 'function') previousReadyHandler();
      resolve(window.YT);
    };

    const existingScript = $('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) {
      existingScript.addEventListener('error', reject, {once:true});
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.addEventListener('error', reject, {once:true});
    document.head.append(script);
  });

  return youtubeApiPromise;
}

async function monitorYouTubePlayers() {
  const playerFrames = $$('#aiWarningGrid iframe[id^="warning-player-"]:not([data-player-monitored])');
  if (!playerFrames.length) return;

  playerFrames.forEach(frame => {
    frame.dataset.playerMonitored = 'true';
    const wrapper = frame.closest('.warning-video');
    const item = aiWarnings[Number(wrapper?.dataset.warningIndex)];
    frame.addEventListener('error', () => {
      showWarningVideoFallback(wrapper, item);
    }, {once:true});
  });

  try {
    const YouTube = await loadYouTubeAPI();
    playerFrames.forEach(frame => {
      if (!frame.isConnected) return;
      const wrapper = frame.closest('.warning-video');
      const item = aiWarnings[Number(wrapper?.dataset.warningIndex)];
      const player = new YouTube.Player(frame, {
        events:{
          onError:() => showWarningVideoFallback(wrapper, item),
        },
      });
      youtubePlayers.push(player);
    });
  } catch {
    playerFrames.forEach(frame => {
      const wrapper = frame.closest('.warning-video');
      const item = aiWarnings[Number(wrapper?.dataset.warningIndex)];
      showWarningVideoFallback(wrapper, item);
    });
  }
}

function renderAIWarnings() {
  const pageCount = Math.ceil(aiWarnings.length / WARNING_PAGE_SIZE);
  const pageStart = warningPage * WARNING_PAGE_SIZE;
  const visibleWarnings = aiWarnings.slice(pageStart, pageStart + WARNING_PAGE_SIZE);

  destroyYouTubePlayers();

  $('#aiWarningGrid').innerHTML = visibleWarnings.map((item, index) => `
    <article class="warning-card">
      <div class="warning-video" data-warning-index="${pageStart + index}">
        ${warningVideoPlayer(item, pageStart + index)}
      </div>
      <div class="warning-card-content">
        <span class="number">NGUY CƠ 0${pageStart + index + 1}</span>
        <span class="icon-tile ${item.color}">${icon(item.icon)}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <a class="text-button warning-video-link" href="${toYouTubeWatchUrl(item.videoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Xem video ${esc(item.videoTitle)} trên YouTube">
          ${item.publisher} · Xem trên YouTube ${icon('external')}
        </a>
      </div>
    </article>
  `).join('');

  $('#warningPageStatus').textContent = `Trang ${warningPage + 1} / ${pageCount}`;
  $('#previousWarnings').disabled = warningPage === 0;
  $('#nextWarnings').disabled = warningPage >= pageCount - 1;
  monitorYouTubePlayers();
}

function updateProgress() {
  const completedCount = progress.completed.length;
  $('#progressNumber').textContent = `${completedCount}/4`;
  $('#progressRing').style.setProperty('--progress', `${completedCount * 90}deg`);
  $('#progressText').textContent = completedCount === 4
    ? 'Bạn đã học đủ 4 bài. Hãy tiếp tục luyện phản xạ.'
    : 'Mỗi bài học là một thói quen tốt hơn.';
  $('#progressLessons').innerHTML = lessons.map(lesson => {
    const done = progress.completed.includes(lesson.id);
    return `<div class="progress-lesson ${done ? 'done' : ''}">${icon(done ? 'check-circle' : 'circle')}<span>${lesson.title}</span></div>`;
  }).join('');
  $('#bestScore').textContent = progress.best === null
    ? 'Chưa làm thử thách'
    : `${progress.best}/10 câu đúng`;
}

function showView(view, {scroll = true, focus = false} = {}) {
  if (!$(`#view-${view}`)) view = 'home';
  $$('.view').forEach(element => {
    element.hidden = element.id !== `view-${view}`;
  });
  $$('#mainNav a').forEach(link => {
    link.removeAttribute('aria-current');
    if (link.dataset.view === view) link.setAttribute('aria-current', 'page');
  });

  $('#mainNav').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded', 'false');
  $('#menuToggle').setAttribute('aria-label', 'Mở menu');
  if (view === 'practice') {
    renderQuiz();
    updateProgress();
  }

  const pageTitles = {
    home:'Lướt thông minh. An toàn hơn.',
    video:'Cảnh báo video AI & deepfake',
    scams:'Nhận diện lừa đảo',
    practice:'Thử thách 5 phút',
    help:'Góc trợ giúp',
  };
  document.title = `${pageTitles[view]} — StudentAntiscam`;
  if (scroll) window.scrollTo({top:0, behavior:'instant'});
  if (focus) {
    const title = $('h1', $(`#view-${view}`));
    title.tabIndex = -1;
    title.focus({preventScroll:true});
  }
}

function navigate(view) {
  if (location.hash !== `#${view}`) location.hash = view;
  else showView(view, {focus:true});
}

function openDialog(eyebrow, content) {
  lastModalFocus = document.activeElement;
  $('#dialogEyebrow').textContent = eyebrow;
  $('#dialogBody').innerHTML = content;
  $('#contentDialog').showModal();
  $('#closeDialog').focus();
}

function closeDialog() {
  $('#contentDialog').close();
}

window.addEventListener('hashchange', () => showView(location.hash.slice(1), {focus:true}));
$('#contentDialog').addEventListener('close', () => {
  if (lastModalFocus?.isConnected) lastModalFocus.focus({preventScroll:true});
});
function openLesson(id){const lesson=lessons.find(l=>l.id===id);if(!lesson)return;openDialog('BÀI HỌC NGẮN / '+lesson.time+' PHÚT',`<h2 id="dialogTitle">${lesson.title}</h2><div class="lesson-content">${lesson.content}</div><div class="dialog-actions"><button class="button primary" data-complete="${lesson.id}">${icon('check-circle')}${progress.completed.includes(id)?'Đã học · đóng bài':'Tôi đã học xong'}</button><button class="text-button" data-dialog-view="${lesson.next}">Thực hành tiếp ${icon('arrow-right')}</button></div>`);}
function openScenario(id){const s=scenarios.find(s=>s.id===id);if(!s)return;openDialog('TÌNH HUỐNG GIẢ LẬP / '+s.label,`<h2 id="dialogTitle">${s.title}</h2>${scenarioImage(s,true)}<div class="scenario-statement"><span class="badge ${s.color}">Chuyện gì đang xảy ra?</span>${s.statement}</div><p><strong>Nếu là bạn, bạn sẽ chọn cách nào?</strong></p><div class="scenario-options">${s.choices.map((choice,i)=>`<button class="scenario-option" data-answer-scenario="${s.id}" data-choice="${i}"><span class="option-letter">${'ABC'[i]}</span><span>${choice}</span></button>`).join('')}</div><div id="scenarioFeedback" aria-live="polite"></div>`);}
function answerScenario(id,choice){const s=scenarios.find(s=>s.id===id);if(!s)return;const correct=choice===s.answer;$$('.scenario-option').forEach((b,i)=>{b.disabled=true;if(i===s.answer)b.classList.add('correct');else if(i===choice)b.classList.add('wrong');});$('#scenarioFeedback').innerHTML=`<div class="scenario-feedback"><h3>${correct?'Lựa chọn có cơ sở!':'Cùng nhìn lại lựa chọn này.'}</h3><p>${s.explanation}</p><h4>Những dấu hiệu trong tình huống</h4><ul>${s.flags.map(f=>'<li>'+f+'</li>').join('')}</ul><div class="dialog-actions"><button class="button primary" data-dialog-view="${s.category==='safety'?'help':'scams'}">${s.category==='safety'?'Xem cách tìm hỗ trợ':'Xem thêm cảnh báo'} ${icon('arrow-right')}</button><button class="text-button" data-retry-scenario="${s.id}">Thử lại</button></div></div>`;}

function currentQuizSet() {
  return quizSets.find(quiz => quiz.id === quizState.selectedQuizId) || null;
}

function renderQuizPicker(area) {
  area.innerHTML = `
    <div class="quiz-picker">
      <span class="icon-tile lavender">${icon('brain')}</span>
      <div class="eyebrow">CHỌN THỬ THÁCH 5 PHÚT</div>
      <h2>Bạn muốn luyện chủ đề nào?</h2>
      <p>Mỗi thử thách gồm 10 câu. Sau mỗi lựa chọn, bạn sẽ nhận được giải thích ngắn để hiểu cách xử lý an toàn.</p>
      <div class="quiz-topic-grid">
        ${quizSets.map(quiz => `
          <button class="quiz-topic-card" type="button" data-quiz-topic="${quiz.id}">
            <span class="icon-tile ${quiz.color}">${icon(quiz.icon)}</span>
            <span class="quiz-topic-copy">
              <strong>${quiz.title}</strong>
              <small>${quiz.desc}</small>
              <span>${quiz.questions.length} câu · Khoảng 5 phút ${icon('arrow-right')}</span>
            </span>
          </button>
        `).join('')}
      </div>
      <p class="field-hint">Điểm là kết quả học tập, không phải thước đo khả năng bảo đảm an toàn.</p>
    </div>
  `;
}

function renderQuiz() {
  const area = $('#quizArea');
  const quiz = currentQuizSet();
  if (!quiz) {
    renderQuizPicker(area);
    return;
  }
  if (quizState.finished) {
    renderQuizFinish();
    return;
  }

  const questions = quiz.questions;
  const question = questions[quizState.index];
  const chosen = quizState.answers[quizState.index];
  const answered = Number.isInteger(chosen);
  const completedQuestions = quizState.index + (answered ? 1 : 0);
  const progressPercent = completedQuestions / questions.length * 100;

  area.innerHTML = `
    <div class="quiz-progress-header">
      <span>CÂU ${quizState.index + 1} / ${questions.length}</span>
      <span>${quiz.title}</span>
    </div>
    <div class="progress-bar" role="progressbar" aria-label="Tiến độ câu hỏi" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${completedQuestions}">
      <span style="width:${progressPercent}%"></span>
    </div>
    <h2 class="quiz-question" id="quizQuestion">${question.q}</h2>
    <div class="quiz-options">
      ${question.options.map((option, index) => `
        <button class="quiz-option ${answered && index === question.answer ? 'correct' : answered && index === chosen ? 'wrong' : ''}" data-quiz-choice="${index}" ${answered ? 'disabled' : ''}>
          <span class="option-letter">${'ABCD'[index]}</span><span>${option}</span>
        </button>
      `).join('')}
    </div>
    <div aria-live="polite">
      ${answered ? `
        <div class="quiz-feedback"><h3>${chosen === question.answer ? 'Đúng rồi!' : 'Cùng kiểm tra lại nhé.'}</h3><p>${question.why}</p></div>
        <div class="quiz-next-row"><button id="nextQuiz" class="button primary">${quizState.index === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} ${icon('arrow-right')}</button></div>
      ` : ''}
    </div>
    <button id="changeQuiz" class="text-button muted quiz-change">Chọn chủ đề khác</button>
  `;
}

function quizScore() {
  const questions = currentQuizSet()?.questions || [];
  return quizState.answers.filter((answer, index) => answer === questions[index]?.answer).length;
}

function renderQuizFinish() {
  const quiz = currentQuizSet();
  if (!quiz) return renderQuiz();
  const questions = quiz.questions;
  const score = quizScore();
  $('#quizArea').innerHTML = `<div class="quiz-finish"><div class="eyebrow" style="justify-content:center">${quiz.title}</div><div class="score-circle">${score}<small>/${questions.length}</small></div><h2>${score>=8?'Phản xạ tốt. Tiếp tục cảnh giác nhé!':score>=5?'Bạn đang xây một lá chắn tốt hơn.':'Mỗi câu hỏi là một cơ hội để học thêm.'}</h2><p>${score>=8?'Hãy mang những thói quen này vào tin nhắn và cuộc gọi mỗi ngày. Điểm cao không thay thế việc xác minh trong tình huống thật.':'Xem lại phần giải thích bên dưới, rồi thử thêm một lần. Không có gì phải ngại khi cần kiểm tra hay nhờ hỗ trợ.'}</p><div class="quiz-finish-actions"><button id="restartQuiz" class="button primary">Thử lại ${icon('arrow-right')}</button><button id="exportQuiz" class="button secondary">${icon('download')}Tải kết quả học tập</button><button id="changeQuiz" class="text-button">Chọn chủ đề khác</button></div><div class="review-list">${questions.map((question,index)=>`<details><summary>${quizState.answers[index]===question.answer?'✓':'○'} Câu ${index+1}: ${question.q}</summary><p><strong>Đáp án phù hợp:</strong> ${question.options[question.answer]}</p><p>${question.why}</p></details>`).join('')}</div></div>`;
}

function finishQuiz() {
  quizState.finished = true;
  const score = quizScore();
  progress.best = progress.best === null ? score : Math.max(progress.best, score);
  saveProgress();
  renderQuiz();
}

function downloadText(name,text){const url=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=name;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Đã tạo tệp để tải xuống.');}
function now(){return new Date().toLocaleString('vi-VN');}
async function copyText(value){try{await navigator.clipboard.writeText(value);toast('Đã sao chép lời nhờ giúp đỡ.');}catch{const textArea=document.createElement('textarea');textArea.value=value;textArea.style.position='fixed';textArea.style.left='-9999px';document.body.append(textArea);textArea.select();let copied=false;try{copied=document.execCommand('copy');}catch{}textArea.remove();if(copied)toast('Đã sao chép lời nhờ giúp đỡ.');else openDialog('NHỜ NGƯỜI LỚN HỖ TRỢ',`<h2 id="dialogTitle">Bạn có thể gửi lời nhắn này</h2><p>Chọn và sao chép đoạn văn dưới đây:</p><div class="scenario-statement">${esc(value)}</div>`);}}

document.addEventListener('click',event=>{
 const trigger=event.target.closest('button,a');if(!trigger)return;
 if(trigger.dataset.view){event.preventDefault();navigate(trigger.dataset.view);if(trigger.dataset.scroll==='sources')setTimeout(()=>$('.sources-section')?.scrollIntoView({behavior:'smooth'}),80);return;}
 if(trigger.dataset.lesson){openLesson(trigger.dataset.lesson);return;}
 if(trigger.dataset.scenario){openScenario(trigger.dataset.scenario);return;}
 if(trigger.dataset.complete){const id=trigger.dataset.complete;if(!progress.completed.includes(id))progress.completed.push(id);saveProgress();closeDialog();toast(storageAvailable?'Đã lưu bài học hoàn thành trên thiết bị này.':'Đã hoàn thành bài học trong phiên hiện tại.');return;}
 if(trigger.dataset.dialogView){closeDialog();navigate(trigger.dataset.dialogView);return;}
 if(trigger.dataset.answerScenario){answerScenario(trigger.dataset.answerScenario,Number(trigger.dataset.choice));return;}
 if(trigger.dataset.retryScenario){const s=scenarios.find(s=>s.id===trigger.dataset.retryScenario);if(s){$('#contentDialog').close();openScenario(s.id);}return;}
 if(trigger.dataset.filter){currentFilter=trigger.dataset.filter;$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===currentFilter);b.setAttribute('aria-pressed',String(b.dataset.filter===currentFilter));});renderScenarios();return;}
 if(trigger.dataset.quizTopic){quizState=emptyQuizState(trigger.dataset.quizTopic);renderQuiz();focusQuiz();return;}
 if(trigger.hasAttribute('data-quiz-choice')){if(Number.isInteger(quizState.answers[quizState.index]))return;quizState.answers[quizState.index]=Number(trigger.dataset.quizChoice);renderQuiz();$('#nextQuiz').focus({preventScroll:true});return;}
 switch(trigger.id){
  case 'menuToggle':{const open=$('#mainNav').classList.toggle('open');trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Đóng menu':'Mở menu');break;}
  case 'progressButton':navigate('practice');break;
  case 'previousWarnings':warningPage=Math.max(0,warningPage-1);renderAIWarnings();$('#aiWarningGrid').focus({preventScroll:true});break;
  case 'nextWarnings':warningPage=Math.min(Math.ceil(aiWarnings.length/WARNING_PAGE_SIZE)-1,warningPage+1);renderAIWarnings();$('#aiWarningGrid').focus({preventScroll:true});break;
  case 'closeDialog':closeDialog();break;
  case 'restartQuiz':quizState=emptyQuizState(quizState.selectedQuizId);renderQuiz();focusQuiz();break;
  case 'changeQuiz':quizState=emptyQuizState();renderQuiz();$('#quizArea h2').tabIndex=-1;$('#quizArea h2').focus({preventScroll:true});break;
  case 'nextQuiz':{const questions=currentQuizSet()?.questions||[];if(quizState.index===questions.length-1)finishQuiz();else{quizState.index++;renderQuiz();focusQuiz();}break;}
  case 'exportQuiz':{const quiz=currentQuizSet();if(!quiz)break;const questions=quiz.questions;downloadText('StudentAntiscam-ket-qua-hoc-tap.txt',`StudentAntiscam — KẾT QUẢ HỌC TẬP\n${quiz.title}\n${now()}\nĐiểm: ${quizScore()}/${questions.length}\nĐây là kết quả bài luyện tập, không phải chứng nhận bảo đảm an toàn.\n\n`+questions.map((question,index)=>`Câu ${index+1}. ${question.q}\nBạn chọn: ${question.options[quizState.answers[index]]}\nĐáp án phù hợp: ${question.options[question.answer]}\nGiải thích: ${question.why}`).join('\n\n'));break;}
  case 'resetProgress':openDialog('TIẾN ĐỘ TRÊN THIẾT BỊ',`<h2 id="dialogTitle">Xóa tiến độ học tập?</h2><p>4 bài học và điểm tốt nhất đã lưu trên trình duyệt này sẽ được xóa. Bạn có thể học lại bất kỳ lúc nào.</p><div class="reset-row"><button id="confirmReset" class="button primary">Xóa tiến độ</button><button id="cancelReset" class="button secondary">Giữ lại</button></div>`);break;
  case 'confirmReset':progress={completed:[],best:null};quizState=emptyQuizState();saveProgress();renderQuiz();closeDialog();toast('Đã xóa tiến độ học tập trên thiết bị này.');break;
  case 'cancelReset':closeDialog();break;
  case 'copyHelpMessage':copyText('Con/em gặp một tình huống trên mạng và cần người lớn giúp kiểm tra. Con/em sẽ kể lại những gì đã xảy ra. Mình có thể cùng xem và tìm cách xử lý được không?');break;
  case 'privacyButton':openDialog('THÔNG TIN VỀ QUYỀN RIÊNG TƯ',`<h2 id="dialogTitle">Một không gian đọc và học an toàn</h2><ul class="privacy-list"><li><strong>Không yêu cầu thông tin cá nhân:</strong> bạn không cần đăng nhập, điền tên, trường, email hay số điện thoại để đọc cảnh báo.</li><li><strong>Tiến độ học:</strong> chỉ các bài đã học và điểm trắc nghiệm tốt nhất được lưu trên trình duyệt của thiết bị này. Có thể xóa ở mục Luyện tập.</li><li><strong>Thiết bị dùng chung:</strong> người dùng cùng trình duyệt có thể thấy tiến độ; hãy xóa nếu bạn muốn.</li><li><strong>Video YouTube:</strong> trình phát nhúng kết nối tới YouTube khi trang video được mở và chịu chính sách dữ liệu của YouTube.</li><li><strong>Không có công cụ phân tích truy cập riêng trong mã ứng dụng.</strong> Khi triển khai website, đơn vị lưu trữ có thể ghi nhật ký truy cập.</li><li><strong>Link tham khảo:</strong> các trang ngoài có chính sách dữ liệu riêng. Hãy đọc thông tin hỗ trợ qua kênh chính thức.</li></ul>`);break;
 }
});
function focusQuiz(){const title=$('#quizQuestion')||$('#quizArea h2');if(title){title.tabIndex=-1;title.focus({preventScroll:true});}}
$('#contentDialog').addEventListener('click',event=>{if(event.target===$('#contentDialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#mainNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');$('#menuToggle').setAttribute('aria-label','Mở menu');}});

loadProgress();
renderIcons();
renderLessons();
renderScenarios();
renderAIWarnings();
updateProgress();
renderQuiz();
$('#helpAccordions').innerHTML=helpCases.map((item,i)=>`<details class="help-accordion" ${i===0?'open':''}><summary>${item.title}${icon('chevron')}</summary><div class="help-accordion-content"><ol>${item.steps.map(step=>`<li>${step}</li>`).join('')}</ol></div></details>`).join('');
$('#sourceCards').innerHTML=sources.map(s=>`<article class="source-card"><span class="badge">${s.org}</span><h3>${s.title}</h3><p>${s.desc}</p><a class="text-button" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Đọc nguồn ${s.org}: ${s.title}">Đọc nguồn chính thức ${icon('external')}</a></article>`).join('');
showView(location.hash.slice(1)||'home',{scroll:false});
})();
