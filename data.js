/* Static educational content and SVG icon definitions. */
'use strict';
(() => {
const iconPaths = {
 shield:'<path d="M12 3 20 6v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
 'arrow-right':'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 play:'<path d="m9 5 11 7-11 7Z"/>',
 video:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/>',
 message:'<path d="M21 11c0 5-4 8-9 8H5l-3 3V8c0-4 4-6 10-6s9 4 9 9Z"/><path d="M7 8h10M7 12h6"/>',
 brain:'<path d="M12 20V5m0 0C9 0 4 4 5 7c-4 1-4 6-1 8-1 4 4 7 8 5m0-15c3-5 8-1 7 2 4 1 4 6 1 8 1 4-4 7-8 5"/><path d="M7 7c2 0 3 2 3 4m-6 4 4-1m9-7c-2 0-3 2-3 4m6 4-4-1"/>',
 phone:'<path d="m7 3-3 1c-2 1-1 5 1 8s6 7 9 8 5 0 6-1l1-3-5-3-2 3c-3-1-5-3-6-6l2-2Z"/>',
 alert:'<path d="m10.3 3-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 8v5m0 3v.1"/>',
 heart:'<path d="M20 4c-3-2-6 0-8 3-2-3-5-5-8-3-7 5 2 13 8 17 6-4 15-12 8-17Z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
 circle:'<circle cx="12" cy="12" r="8"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="m8 13-3 9 7-3 7 3-3-9m-6-5 1.5 1.5L15 6"/>',
 people:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8m2 3c3 1 3 4 3 7"/>',
 copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
 external:'<path d="M13 3h8v8M21 3 10 14M9 3H3v18h18v-6"/>',
 close:'<path d="m5 5 14 14M5 19 19 5"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 chevron:'<path d="m5 8 7 7 7-7"/>',
 wallet:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M17 11h5v5h-5a2.5 2.5 0 0 1 0-5ZM3 8h17M7 3l10-1v3"/>',
};
function icon(name) { return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.shield}</svg>`; }

const lessons=[
 {id:'ai',title:'Hiểu đúng về video AI',desc:'Deepfake là gì? Vì sao mắt và tai có thể bị đánh lừa?',icon:'video',color:'lavender',time:3,
 content:`<h3>AI có thể làm được những gì?</h3><p>Video AI là video có nội dung được tạo hoặc chỉnh sửa bằng trí tuệ nhân tạo. Deepfake có thể thay khuôn mặt, mô phỏng giọng nói hoặc làm một người có vẻ đang nói điều họ chưa từng nói.</p><h3>AI cũng có cách dùng tích cực</h3><p>Hoạt hình, mô phỏng bài học hay lồng tiếng có thể sử dụng AI một cách minh bạch. Điều cần kiểm tra là người đăng có công bố việc dùng AI và nội dung có bị sử dụng để đánh lừa, xâm hại hay mạo danh người khác không.</p><h3>3 điều dễ hiểu lầm</h3><ul><li><strong>“Hình rất nét nên là thật.”</strong> Chất lượng hình ảnh không chứng minh nguồn gốc.</li><li><strong>“Giọng giống hệt nên đúng người đó.”</strong> Giọng nói có thể được mô phỏng.</li><li><strong>“Không có lỗi nên không phải AI.”</strong> Video AI có thể không lộ dấu hiệu dễ thấy.</li></ul><div class="callout violet"><span>${icon('info')}</span><div><strong>Câu hỏi tốt hơn: “Mình có bằng chứng gì để tin?”</strong><p>Nguồn gốc, ngữ cảnh và xác minh độc lập giúp bạn quyết định có cơ sở hơn.</p></div></div>`,next:'video'},
 {id:'habits',title:'Thói quen tránh bẫy online',desc:'Dừng trước yêu cầu đáng ngờ. Giữ mã riêng và biết nhờ hỗ trợ.',icon:'shield',color:'sky',time:3,
 content:`<h3>Dừng khi bị giục gấp</h3><p>Những câu như “chỉ còn 5 phút”, “khóa tài khoản ngay” hoặc “chuyển tiền giúp cô” dễ khiến bạn hành động vì lo lắng. Hãy dành một nhịp để suy nghĩ và không thực hiện yêu cầu nhạy cảm khi còn nghi ngờ.</p><h3>Giữ mã riêng của mình</h3><p>Không đọc hoặc gửi OTP, mật khẩu hay mã khôi phục cho người khác. Không nhập tài khoản vào link nhận quà từ người chưa biết rõ.</p><h3>Đừng để một lời hứa kéo bạn vào giao dịch</h3><p>Học bổng, skin game và việc làm hấp dẫn có thể được dùng làm mồi nhử. Cảnh giác với yêu cầu đóng phí, nạp tiền hoặc đặt cọc để nhận quyền lợi.</p><h3>Giữ kết nối với người hỗ trợ</h3><p>Kể với bố mẹ, người giám hộ hoặc thầy cô khi một người yêu cầu bạn giữ bí mật, gửi ảnh riêng tư hoặc làm điều khiến bạn bất an.</p><div class="callout mint"><span>${icon('heart')}</span><div><strong>Bạn luôn có quyền dừng lại và nhờ giúp đỡ.</strong><p>Người hỗ trợ đáng tin cậy sẽ cùng bạn tìm cách xử lý, không ép bạn chuyển tiền hay cung cấp dữ liệu.</p></div></div>`,next:'scams'},
 {id:'scam',title:'Đọc vị chiêu trò lừa đảo',desc:'Nhận ra lời thúc giục, quà bất ngờ và yêu cầu giữ bí mật.',icon:'message',color:'peach',time:4,
 content:`<h3>Đừng chỉ đọc lời hứa. Hãy đọc yêu cầu.</h3><p>“Nhận học bổng”, “nhận vật phẩm hiếm” hay “việc nhẹ” nghe hấp dẫn. Nhưng họ đang yêu cầu bạn chuyển tiền, tiết lộ dữ liệu hay đăng nhập vào đâu?</p><h3>Những yêu cầu bạn cần cảnh giác</h3><ul><li>Bị ép quyết định ngay, dọa mất quyền lợi hoặc khóa tài khoản.</li><li>Được yêu cầu gửi OTP, mật khẩu, mã khôi phục hay thông tin tài chính.</li><li>Phải trả phí trước để được nhận quà, giải thưởng hoặc việc làm.</li><li>Phải giấu bố mẹ, thầy cô; chuyển sang một tài khoản riêng.</li></ul><h3>Trang đẹp không bảo đảm an toàn</h3><p>Logo quen thuộc, ảnh người nổi tiếng và dấu HTTPS có thể khiến một trang trông đáng tin. Những chi tiết này không bảo đảm người đứng sau trang sẽ giữ đúng lời hứa.</p><p>Cảnh giác với link nhận quà hoặc đăng nhập do người lạ gửi. Khi cần dùng dịch vụ, tự mở ứng dụng hoặc địa chỉ chính thức bạn đã biết.</p>`,next:'scams'},
 {id:'privacy',title:'Bảo vệ mình & bạn bè',desc:'Giữ dữ liệu riêng tư. Biết tìm hỗ trợ khi bị đe dọa.',icon:'shield',color:'mint',time:3,
 content:`<h3>Giữ những điều riêng tư ở đúng chỗ</h3><ul><li>Dùng mật khẩu riêng cho mỗi tài khoản và bật xác thực hai bước khi có.</li><li>Không đọc hoặc gửi OTP, mật khẩu hay mã khôi phục cho người khác.</li><li>Kiểm tra quyền xem bài đăng, thông tin trường/lớp, vị trí và quyền truy cập camera.</li><li>Hỏi sự đồng ý trước khi đăng ảnh hoặc video của bạn bè.</li></ul><h3>Nếu bị ghép mặt, đe dọa hoặc bêu xấu</h3><p>Bạn không có lỗi vì bị người khác lợi dụng hình ảnh. Không trả tiền hay gửi thêm ảnh để đổi lấy lời hứa im lặng. Hãy tìm người lớn đáng tin cậy và báo cáo tài khoản trên nền tảng.</p><h3>Giúp một người bạn đang gặp chuyện</h3><p>Lắng nghe, không trách móc và không chuyển tiếp nội dung làm bạn ấy tổn thương. Cùng bạn ấy tìm giáo viên, người giám hộ hoặc phòng tư vấn học đường.</p><div class="callout mint"><span>${icon('heart')}</span><div><strong>Lưu thông tin sự việc, tránh lan truyền nội dung nhạy cảm.</strong><p>Ghi tài khoản, thời điểm và lời đe dọa bằng chữ. Không tải xuống hay chia sẻ ảnh/video nhạy cảm của học sinh.</p></div></div>`,next:'help'}
];
const scenarioImages={"scholarship":{"src":"assets/scenarios/scholarship.jpg","alt":"Ảnh minh họa một nữ sinh dừng lại suy nghĩ khi đọc tin nhắn học bổng trên điện thoại tại bàn học."},"teacher":{"src":"assets/scenarios/teacher.jpg","alt":"Ảnh minh họa một nam sinh nhìn cuộc gọi video có hình ảnh giáo viên trên màn hình điện thoại."},"game":{"src":"assets/scenarios/game.jpg","alt":"Ảnh minh họa một nam sinh nhìn điện thoại bên cạnh trang nhận vật phẩm game trên máy tính."},"job":{"src":"assets/scenarios/job.jpg","alt":"Ảnh minh họa một nữ sinh đọc lời mời làm thêm trên điện thoại bên cạnh sách vở."},"shopping":{"src":"assets/scenarios/shopping.jpg","alt":"Ảnh minh họa hai học sinh trao đổi về lời chào bán vé concert trên điện thoại tại sân trường."},"deepfake":{"src":"assets/scenarios/deepfake.jpg","alt":"Ảnh minh họa một nữ sinh tìm sự hỗ trợ của giáo viên sau khi gặp lời đe dọa trên mạng."}};
const scenarios=[
 {id:'scholarship',category:'money',label:'HỌC BỔNG & TIỀN',color:'peach',title:'Học bổng “chỉ còn 5 phút”',desc:'Bạn trúng học bổng nhưng phải đóng phí để giữ suất. Có nên chuyển?',artSub:'Nộp 200.000đ để giữ suất',
 statement:'Một tài khoản tự nhận là quỹ học bổng gửi tin: “Em được học bổng 5 triệu đồng. Chuyển 200.000đ phí xác nhận trong 5 phút để giữ suất. Không cần hỏi nhà trường.”',choices:['Chuyển tiền ngay vì số phí khá nhỏ.','Hỏi trong nhóm xem ai cũng nhận được rồi làm theo.','Dừng lại, hỏi nhà trường và kiểm tra thông báo qua kênh chính thức.'],answer:2,explanation:'Đóng phí trước, thời hạn gấp và ngăn bạn hỏi nhà trường là những dấu hiệu đáng ngờ. Hãy tự tìm kênh chính thức của chương trình và xác minh điều kiện; không dựa vào thông tin do người nhắn tự cung cấp.',flags:['Đòi tiền trước khi nhận quyền lợi.','Thúc giục để bạn không có thời gian suy nghĩ.','Ngăn bạn hỏi nhà trường.']},
 {id:'teacher',category:'ai',label:'GIẢ MẠO BẰNG AI',color:'lavender',title:'Cô giáo gọi nhờ chuyển tiền',desc:'Đúng khuôn mặt, đúng giọng nói. Yêu cầu chuyển tiền thì sao?',artSub:'“Đừng kể với bố mẹ nhé”',
 statement:'Video call trông giống giáo viên chủ nhiệm nói: “Cô cần gấp 500.000đ. Em chuyển vào tài khoản cô vừa gửi, đừng nói với bố mẹ.” Cuộc gọi hơi mờ nhưng giọng rất quen.',choices:['Ngắt cuộc gọi, gọi số cô đã lưu từ trước hoặc hỏi trực tiếp nhà trường.','Chuyển tiền vì đã nhìn rõ khuôn mặt cô.','Yêu cầu người gọi quay đầu; nếu làm được thì chuyển tiền.'],answer:0,explanation:'Khuôn mặt, giọng nói và thử thách quay đầu không đủ xác minh danh tính. Với yêu cầu tiền và giữ bí mật, cần liên hệ qua số có sẵn từ trước hoặc gặp trực tiếp. Chưa thể kết luận đây là video AI chỉ từ chất lượng hình.',flags:['Yêu cầu chuyển tiền gấp.','Yêu cầu giữ bí mật với người lớn.','Thông tin tài khoản nhận tiền chưa được xác minh.']},
 {id:'game',category:'account',label:'TÀI KHOẢN & GAME',color:'mint',title:'Skin miễn phí, tài khoản “bay”',desc:'Một đường link nhận quà hỏi mật khẩu và mã OTP của bạn.',artSub:'Đăng nhập để nhận quà ngay',
 statement:'Bạn nhận link “nhận skin miễn phí”. Trang có logo game rất đẹp, yêu cầu tên đăng nhập, mật khẩu và mã OTP. Link khác với địa chỉ game bạn thường dùng.',choices:['Đăng nhập bằng tài khoản phụ trước để thử.','Đóng trang, tự mở game hoặc website chính thức để kiểm tra chương trình.','Gửi OTP vì trang có logo và dùng HTTPS.'],answer:1,explanation:'Logo có thể bị sao chép và HTTPS không xác nhận chủ trang. Không nhập thông tin vào link chưa xác minh; tự mở game hoặc trang chính thức. Nếu đã nhập mật khẩu hay OTP, cần đổi mật khẩu và đăng xuất phiên lạ qua ứng dụng chính thức.',flags:['Tên miền không khớp kênh bạn đã biết.','Thu thập mật khẩu và OTP qua link nhận quà.','Dùng phần thưởng để khiến bạn bỏ qua việc kiểm tra.']},
 {id:'job',category:'money',label:'VIỆC LÀM & TIỀN',color:'sky',title:'Việc nhẹ, phải nạp tiền trước',desc:'“Làm nhiệm vụ nhận hoa hồng” bắt đầu bằng một khoản cọc.',artSub:'Nạp trước để mở nhiệm vụ',
 statement:'Một người tuyển “cộng tác viên học sinh, làm 30 phút được 500.000đ/ngày”. Bạn phải nạp 300.000đ mở nhiệm vụ và tiếp tục nạp tiền để rút hoa hồng.',choices:['Nạp thử lần đầu, nếu được trả thì tiếp tục.','Vay bạn để nạp vì hoa hồng cao hơn tiền cọc.','Dừng giao dịch, kiểm tra đơn vị tuyển dụng cùng người lớn và không nạp thêm.'],answer:2,explanation:'Lời hứa thu nhập dễ dàng cùng yêu cầu nạp tiền để làm việc hoặc rút tiền là dấu hiệu cần dừng. Một lần được trả khoản nhỏ không chứng minh toàn bộ chương trình đáng tin.',flags:['Thu nhập hứa hẹn quá hấp dẫn so với công việc.','Nạp tiền để được nhận việc.','Nạp thêm tiền mới được rút hoa hồng.']},
 {id:'shopping',category:'money',label:'MUA BÁN TRỰC TUYẾN',color:'peach',title:'Vé concert rẻ bất ngờ',desc:'Người bán muốn chuyển cọc ngoài nền tảng và không cho kiểm tra.',artSub:'Chuyển cọc ngay, không qua sàn',
 statement:'Một tài khoản bán vé concert giá rất thấp. Họ gửi ảnh vé và giục bạn chuyển cọc sang tài khoản cá nhân. Họ không cho xác minh vé và nói giao dịch qua nền tảng sẽ mất nhiều phí.',choices:['Kiểm tra người bán, điều kiện chuyển nhượng và kênh bán vé chính thức; chưa xác minh thì không cọc.','Chuyển tiền vì ảnh vé có mã QR rõ nét.','Nhờ một người bạn quét QR để chứng minh vé là thật.'],answer:0,explanation:'Ảnh vé và mã QR có thể bị sao chép; có mã không chứng minh bạn sẽ được vào cửa. Hãy kiểm tra quy định chuyển nhượng và kênh chính thức, tránh giao dịch thiếu bảo vệ hoặc không xác minh được.',flags:['Giá hấp dẫn đi kèm thúc giục chuyển cọc.','Muốn đưa giao dịch ra ngoài kênh có bảo vệ.','Không cho kiểm tra tính hợp lệ của vé.']},
 {id:'deepfake',category:'safety',label:'BẢO VỆ BẢN THÂN',color:'lavender',title:'Bị ghép mặt và đe dọa',desc:'Một người dọa phát tán ảnh ghép nếu bạn không trả tiền.',artSub:'Bạn có quyền được hỗ trợ',
 statement:'Một tài khoản nói họ có ảnh ghép mặt bạn và đe dọa gửi cho cả lớp. Họ yêu cầu tiền, bảo bạn giữ kín và không nói với ai.',choices:['Trả tiền để người đó hứa xóa ảnh.','Không trả tiền; tìm người lớn đáng tin cậy, ghi thông tin sự việc và báo cáo tài khoản.','Gửi thêm ảnh cá nhân để thương lượng.'],answer:1,explanation:'Đe dọa là hành vi gây hại dù ảnh là thật hay ghép. Không trả tiền hay gửi thêm dữ liệu. Nhờ người giám hộ hoặc giáo viên hỗ trợ; ghi tài khoản, thời điểm và lời đe dọa bằng chữ. Không tải hoặc chuyển tiếp ảnh/video nhạy cảm.',flags:['Đe dọa phát tán hình ảnh để ép buộc.','Đòi tiền và yêu cầu giữ bí mật.','Cố cô lập bạn khỏi người hỗ trợ.']}
];
const questions=[
 {q:'Video có hình rất nét và không thấy lỗi. Bạn có thể kết luận là video thật không?',options:['Có, vì AI luôn làm sai bàn tay.','Chưa thể; cần kiểm tra nguồn gốc và ngữ cảnh.','Có, nếu có nhiều lượt xem.','Không, video nét luôn do AI tạo.'],answer:1,why:'Độ nét và việc không thấy lỗi không xác nhận nguồn gốc. Hãy tìm nguồn đăng gốc, bối cảnh và bằng chứng độc lập.'},
 {q:'Video call giống cô giáo yêu cầu bạn chuyển tiền gấp. Bước nào phù hợp nhất?',options:['Chuyển vì khuôn mặt đúng.','Yêu cầu cô quay đầu rồi chuyển.','Ngắt cuộc gọi, gọi lại số cô đã lưu từ trước.','Gọi số mới người đó vừa nhắn.'],answer:2,why:'Kênh độc lập có sẵn từ trước giúp xác minh danh tính. Khuôn mặt, giọng nói hoặc một động tác không bảo đảm người gọi là thật.'},
 {q:'Trang nhận quà dùng HTTPS và có biểu tượng ổ khóa. Điều đó cho biết gì?',options:['Kết nối được mã hóa; vẫn cần kiểm tra chủ trang.','Trang chắc chắn thuộc công ty được nhắc đến.','Quà trên trang đã được kiểm duyệt.','Bạn có thể gửi OTP an toàn cho bất kỳ người nào.'],answer:0,why:'HTTPS bảo vệ kết nối, không chứng minh nội dung hay chủ trang đáng tin. Trang lừa đảo cũng có thể sử dụng HTTPS.'},
 {q:'Người nhắn xin mã OTP để “xác nhận học bổng”. Bạn nên làm gì?',options:['Gửi nếu họ biết tên bạn.','Gửi nửa mã để thử.','Đăng mã lên nhóm để hỏi.','Không gửi; kiểm tra học bổng qua kênh chính thức.'],answer:3,why:'Không đọc hoặc gửi OTP cho người khác. Đừng để một lời hứa quyền lợi khiến bạn giao quyền xác thực tài khoản.'},
 {q:'Cùng một clip xuất hiện trên 20 tài khoản. Đây có phải 20 nguồn độc lập xác nhận không?',options:['Có, nhiều người đăng thì chắc đúng.','Không nhất thiết; họ có thể chỉ đăng lại cùng một nguồn.','Có, nếu đều có nhiều người theo dõi.','Không, mọi clip được chia sẻ đều sai.'],answer:1,why:'Chia sẻ lại không tạo thêm bằng chứng. Cần xem các nguồn có bằng chứng độc lập hay cùng dựa vào một clip.'},
 {q:'Bạn thấy khẩu hình không khớp giọng nói trong clip. Nên hiểu thế nào?',options:['Đây chắc chắn là AI.','Đây chắc chắn là video thật bị lỗi.','Đó là gợi ý kiểm tra thêm; còn có thể do đồng bộ hoặc nén video.','Bỏ qua tất cả vì dấu hiệu hình ảnh không có ích.'],answer:2,why:'Dấu hiệu hình ảnh có thể giúp phát hiện điều bất thường nhưng không đủ kết luận. Hãy xem bản gốc và đối chiếu nguồn.'},
 {q:'Lời mời làm nhiệm vụ nhận hoa hồng yêu cầu nạp tiền mới được rút. Bạn nên làm gì?',options:['Dừng nạp và nhờ người lớn đáng tin cậy hỗ trợ.','Nạp thêm một khoản nhỏ để thử.','Vay bạn để đủ tiền rút hoa hồng.','Gửi mật khẩu để người tuyển làm giúp.'],answer:0,why:'Yêu cầu nạp tiền để rút hoa hồng là dấu hiệu cần cảnh giác. Không chuyển thêm tiền; nếu đã giao dịch, cùng người lớn liên hệ ngân hàng và cơ quan hỗ trợ.'},
 {q:'Một người dọa phát tán ảnh ghép của bạn và yêu cầu giữ kín. Bạn nên làm gì?',options:['Trả tiền vì sẽ chắc chắn được xóa ảnh.','Gửi thêm ảnh để họ tin bạn.','Giữ kín và tự chịu đựng.','Nhờ người lớn đáng tin cậy, báo cáo tài khoản; không trả tiền hoặc gửi thêm dữ liệu.'],answer:3,why:'Bạn xứng đáng được hỗ trợ. Không để lời đe dọa cô lập bạn. Ghi tài khoản, thời điểm và lời đe dọa bằng chữ; không lan truyền nội dung nhạy cảm.'},
 {q:'Bạn đã nhập mật khẩu vào một trang đáng ngờ. Bước nào phù hợp?',options:['Chờ xem có bị mất tài khoản không.','Đổi mật khẩu qua ứng dụng chính thức, kiểm tra phiên đăng nhập và bật xác thực hai bước.','Nhắn mật khẩu mới cho người gửi link.','Xóa lịch sử trình duyệt là đủ.'],answer:1,why:'Hãy dùng kênh chính thức để đổi mật khẩu, thoát phiên lạ và kiểm tra thông tin khôi phục. Nếu mật khẩu dùng lại ở nơi khác, đổi tại những tài khoản đó và nhờ người lớn hỗ trợ.'},
 {q:'Một video được công bố là có sử dụng AI để minh họa bài học. Điều nào đúng?',options:['Mọi video AI đều là lừa đảo.','Cứ ghi AI là mọi thông tin trong video đúng.','Có thể là cách dùng tích cực; vẫn cần xem nguồn thông tin và ngữ cảnh.','Không cần kiểm tra nguồn vì dùng để học.'],answer:2,why:'AI có thể hỗ trợ học tập và sáng tạo. Tính minh bạch, quyền của người được thể hiện và độ đúng của nội dung vẫn cần được xem xét.'}
];

const videoAIQuestions = [
  {q:'Một video ghi lại hình ảnh một hiệu trưởng đang phát biểu những nội dung gây tranh cãi. Video có hình ảnh và giọng nói rất chân thực. Cách ứng xử nào đúng nhất?',options:['Tin ngay vì video có hình ảnh và giọng nói rõ ràng.','Chia sẻ cho bạn bè để mọi người cùng kiểm chứng.','Kiểm tra nguồn đăng, tìm thông tin từ các kênh chính thống và xem xét khả năng video bị tạo hoặc chỉnh sửa bằng AI.'],answer:2,why:'Hình ảnh và giọng nói chân thực không chứng minh video là thật. Cần kiểm tra nguồn gốc, đối chiếu kênh chính thống và xác minh độc lập trước khi tin hoặc chia sẻ.'},
  {q:'Vì sao Deepfake Video có thể đặc biệt nguy hiểm hơn một bức ảnh giả?',options:['Video có khả năng mô phỏng đồng thời khuôn mặt, giọng nói, biểu cảm và chuyển động, khiến người xem dễ tin rằng sự việc thực sự xảy ra.','Video luôn có chất lượng cao hơn ảnh.','Video AI không thể bị phát hiện.'],answer:0,why:'Deepfake có thể kết hợp nhiều tín hiệu quen thuộc cùng lúc như khuôn mặt, giọng nói, biểu cảm và chuyển động, làm nội dung giả trở nên thuyết phục hơn.'},
  {q:'Một học sinh nhận được video có hình ảnh người thân nói: “Con hãy chuyển tiền ngay vì bố đang gặp sự cố.” Video rất giống người thân của em. Hành động nào an toàn nhất?',options:['Chuyển tiền ngay vì đã nhìn thấy hình ảnh người thân.','Gọi điện trực tiếp cho người thân bằng một kênh khác để xác minh trước khi thực hiện bất kỳ giao dịch nào.','Gửi video cho nhiều người để hỏi xem có nên chuyển tiền không.'],answer:1,why:'Khi có yêu cầu chuyển tiền, hãy xác minh qua số điện thoại hoặc kênh liên lạc quen thuộc có sẵn từ trước. Không dùng chính thông tin người gửi cung cấp để xác minh.'},
  {q:'Một học sinh dùng khuôn mặt của bạn mình để tạo một video AI khiến bạn đó nói những điều chưa từng nói. Nguy cơ nghiêm trọng nhất là gì?',options:['Chỉ làm video có dung lượng lớn hơn.','Có thể gây tổn hại danh dự, uy tín và quyền riêng tư của người bị giả mạo.','Làm máy tính chạy chậm hơn.'],answer:1,why:'Giả mạo khuôn mặt và lời nói có thể xâm phạm quyền riêng tư, làm tổn hại danh dự, quan hệ và sự an toàn của người bị nhắm tới.'},
  {q:'Một video AI giả mạo một người nổi tiếng đang quảng cáo một sản phẩm đầu tư và cam kết “lợi nhuận 100%”. Dấu hiệu nào khiến người xem cần đặc biệt cảnh giác?',options:['Người nổi tiếng xuất hiện trong video.','Video có hình ảnh đẹp và âm thanh rõ.','Nội dung yêu cầu chuyển tiền hoặc đầu tư dựa trên lời hứa lợi nhuận cao và sử dụng hình ảnh người nổi tiếng để tạo lòng tin.'],answer:2,why:'Cam kết lợi nhuận rất cao, yêu cầu chuyển tiền và mượn hình ảnh người nổi tiếng để tạo lòng tin là những dấu hiệu cần dừng lại và kiểm tra.'},
  {q:'Một video AI được tạo ra rất chân thực nhưng nội dung hoàn toàn bịa đặt. Điều này cho thấy nguy cơ nào của AI?',options:['AI có thể làm cho thông tin sai lệch trở nên thuyết phục hơn và khó nhận biết bằng mắt thường.','AI chỉ tạo được thông tin sai khi video có chất lượng thấp.','Người xem luôn có thể phân biệt video thật và video AI bằng mắt thường.'],answer:0,why:'Nội dung tổng hợp có thể rất chân thực. Quan sát bằng mắt thường không đủ; nguồn gốc, ngữ cảnh và bằng chứng độc lập quan trọng hơn.'},
  {q:'Một học sinh phát hiện một video có thể là Deepfake. Cách làm nào không nên thực hiện?',options:['Kiểm tra nguồn gốc và thời điểm video được đăng.','Tìm các nguồn độc lập để đối chiếu thông tin.','Chia sẻ video trước, sau đó mới kiểm tra xem có thật hay không.'],answer:2,why:'Chia sẻ trước khi kiểm tra có thể làm nội dung giả lan rộng và gây hại. Hãy xác minh trước, đồng thời tránh phát tán nội dung đáng ngờ.'},
  {q:'Tại sao việc phổ biến các video AI giả mạo có thể gây nguy hiểm cho xã hội?',options:['Vì mọi video AI đều vi phạm pháp luật.','Vì video giả có thể làm người xem mất niềm tin vào thông tin thật, gây hiểu lầm, hoang mang hoặc ảnh hưởng đến danh dự của cá nhân, tổ chức.','Vì video AI luôn chiếm nhiều dung lượng lưu trữ.'],answer:1,why:'Video giả có thể gây hiểu lầm, hoang mang, tổn hại danh dự và làm suy giảm niềm tin vào cả những thông tin có thật.'},
  {q:'Một học sinh nhận được video AI giả mạo giáo viên và có nội dung xúc phạm giáo viên. Em nên làm gì?',options:['Đăng lại lên mạng để mọi người cùng xem.','Lưu giữ bằng chứng cần thiết, không phát tán và báo cho giáo viên, phụ huynh hoặc người có trách nhiệm để xử lý.','Dùng AI tạo một video khác để trả đũa.'],answer:1,why:'Không phát tán hoặc trả đũa. Hãy lưu những thông tin cần thiết về sự việc và nhờ giáo viên, phụ huynh hoặc người có trách nhiệm hỗ trợ.'},
  {q:'Vận dụng cao: Một video có hình ảnh một người bạn của em nói một câu rất bất thường. Video được gửi từ một tài khoản lạ và đang được nhiều người chia sẻ. Em chưa biết video thật hay giả. Cách xử lý nào thể hiện năng lực sử dụng AI an toàn nhất?',options:['Dựa vào cảm xúc và biểu cảm của nhân vật để quyết định video là thật hay giả.','Không vội tin hoặc chia sẻ; kiểm tra nguồn, đối chiếu thông tin, xác minh với người liên quan và báo cáo nếu phát hiện dấu hiệu giả mạo.','Sử dụng một công cụ AI khác hỏi “Video này có phải Deepfake không?” rồi tin hoàn toàn vào kết quả.'],answer:1,why:'Xử lý an toàn cần kết hợp nhiều bước: dừng chia sẻ, kiểm tra nguồn, đối chiếu thông tin và xác minh với người liên quan. Không nên phụ thuộc hoàn toàn vào cảm xúc hoặc một công cụ AI.'},
];

const onlineScamQuestions = [
  {q:'Em nhận được tin nhắn: “Chúc mừng bạn đã trúng thưởng 50 triệu đồng. Nhấn vào đường link và nhập thông tin tài khoản để nhận thưởng.” Dấu hiệu đáng ngờ nhất là gì?',options:['Tin nhắn sử dụng lời chúc mừng.','Yêu cầu cung cấp thông tin tài khoản thông qua một đường link không rõ nguồn gốc.','Phần thưởng có giá trị lớn.'],answer:1,why:'Yêu cầu nhập thông tin tài khoản qua một đường link không rõ nguồn gốc là dấu hiệu điển hình của hành vi đánh cắp thông tin.'},
  {q:'Một người tự nhận là nhân viên ngân hàng gọi điện và yêu cầu em đọc mã OTP để “xác minh tài khoản”. Em nên làm gì?',options:['Đọc OTP nếu người gọi biết họ tên của em.','Chỉ đọc một phần mã OTP để kiểm tra.','Không cung cấp OTP và chủ động liên hệ ngân hàng qua kênh chính thức để xác minh.'],answer:2,why:'OTP là mã xác thực riêng. Không đọc toàn bộ hay một phần mã cho người khác; hãy tự liên hệ ngân hàng qua ứng dụng, website hoặc số điện thoại chính thức.'},
  {q:'Một tài khoản mạng xã hội giống hệt tài khoản của người thân nhắn tin: “Mẹ đang gặp việc gấp, chuyển ngay 5 triệu vào tài khoản này giúp mẹ.” Cách xử lý an toàn nhất là:',options:['Chuyển tiền ngay vì tài khoản có ảnh đại diện của mẹ.','Gọi trực tiếp cho mẹ bằng số điện thoại quen thuộc để xác minh.','Hỏi người nhắn tên đầy đủ của mẹ rồi chuyển tiền.'],answer:1,why:'Ảnh đại diện và thông tin cá nhân có thể bị sao chép. Gọi số điện thoại quen thuộc là một kênh độc lập phù hợp để xác minh.'},
  {q:'Một website có giao diện giống trang ngân hàng và yêu cầu đăng nhập tài khoản. Địa chỉ website chỉ khác website chính thức một vài ký tự. Đây có thể là hình thức:',options:['Phishing – giả mạo website để đánh cắp thông tin.','Sao lưu dữ liệu trực tuyến.','Cập nhật phần mềm tự động.'],answer:0,why:'Tên miền gần giống và giao diện sao chép thường được dùng trong phishing để đánh cắp tên đăng nhập, mật khẩu hoặc thông tin tài chính.'},
  {q:'Vì sao kẻ lừa đảo thường tạo cảm giác “khẩn cấp” như “chuyển tiền ngay”, “tài khoản sắp bị khóa”, “chỉ còn 5 phút”?',options:['Để người dùng có thêm thời gian suy nghĩ.','Để khiến nạn nhân hoảng sợ và hành động nhanh trước khi kịp kiểm chứng thông tin.','Vì các giao dịch trực tuyến luôn bắt buộc phải thực hiện trong thời gian ngắn.'],answer:1,why:'Áp lực thời gian làm người nhận hoảng sợ và bỏ qua bước kiểm tra. Khi bị thúc giục, hãy dừng lại và xác minh qua kênh chính thức.'},
  {q:'Em nhận được một cuộc gọi video có hình ảnh và giọng nói giống hệt người thân yêu cầu chuyển tiền. Vì sao vẫn cần xác minh bằng phương thức khác?',options:['AI có thể được sử dụng để tạo hoặc giả mạo hình ảnh, khuôn mặt và giọng nói của một người.','Video luôn có thể bị lỗi âm thanh.','Người thân không bao giờ được phép gọi video.'],answer:0,why:'AI có thể mô phỏng đồng thời khuôn mặt và giọng nói. Hãy ngắt cuộc gọi và liên hệ lại qua kênh quen thuộc có sẵn từ trước.'},
  {q:'Một quảng cáo trên mạng xã hội giới thiệu điện thoại mới với giá chỉ bằng 10% giá thị trường và yêu cầu chuyển khoản trước. Hành động nào phù hợp nhất?',options:['Chuyển tiền ngay vì giá quá rẻ.','Kiểm tra người bán, website, thông tin liên hệ, đánh giá và phương thức thanh toán trước khi mua.','Chia sẻ quảng cáo cho bạn bè để cùng mua.'],answer:1,why:'Mức giá bất thường và yêu cầu chuyển khoản trước cần được kiểm tra kỹ. Ưu tiên kênh bán và phương thức thanh toán có cơ chế bảo vệ người mua.'},
  {q:'Một người lạ gửi cho em một file có tên “Danh sách học sinh nhận học bổng.xlsx” và yêu cầu mở file rồi đăng nhập tài khoản. Điều gì khiến em cần cảnh giác?',options:['File Excel luôn chứa virus.','File có thể được sử dụng để dẫn dụ người dùng mở nội dung độc hại hoặc cung cấp thông tin đăng nhập.','Học bổng không bao giờ được thông báo bằng file.'],answer:1,why:'Không phải mọi file Excel đều nguy hiểm, nhưng file bất ngờ từ người lạ có thể chứa nội dung độc hại hoặc dẫn tới trang thu thập thông tin đăng nhập.'},
  {q:'Nếu chẳng may đã cung cấp mật khẩu tài khoản cho một trang web lừa đảo, việc nào cần ưu tiên?',options:['Tiếp tục đăng nhập để kiểm tra xem tài khoản có bị mất không.','Đổi mật khẩu ngay, bật xác thực hai yếu tố nếu có và kiểm tra các hoạt động bất thường của tài khoản.','Chờ vài ngày xem có vấn đề gì xảy ra không.'],answer:1,why:'Cần hành động ngay qua ứng dụng hoặc website chính thức: đổi mật khẩu, đăng xuất phiên lạ, kiểm tra thông tin khôi phục và bật xác thực hai yếu tố.'},
  {q:'Vận dụng cao: Em nhận được tin nhắn từ một người bạn: “Mình đang cần tiền gấp, chuyển giúp mình 2 triệu vào tài khoản này nhé.” Tin nhắn có cách nói khác thường so với bạn của em. Sau đó, em còn nhận được một video AI giả giọng và khuôn mặt của bạn để thuyết phục em. Em nên làm gì?',options:['Tin vì đã có cả tin nhắn và video làm bằng chứng.','Gọi trực tiếp cho bạn bằng một phương thức liên lạc quen thuộc khác để xác minh trước khi thực hiện bất kỳ giao dịch nào.','Chuyển một khoản nhỏ trước để kiểm tra tài khoản có đúng là của bạn không.'],answer:1,why:'Cả tài khoản, giọng nói và khuôn mặt đều có thể bị giả mạo. Chỉ xác minh qua một kênh liên lạc độc lập, quen thuộc trước khi chuyển bất kỳ khoản tiền nào.'},
];

const quizSets = [
  {id:'general',title:'Phản xạ an toàn tổng hợp',desc:'Ôn luyện video AI, lừa đảo và bảo vệ tài khoản qua các tình huống ngắn.',icon:'brain',color:'lavender',questions},
  {id:'video-ai',title:'Sự nguy hiểm của Video AI',desc:'Nhận diện Deepfake, giả mạo và cách xác minh nội dung trước khi tin hoặc chia sẻ.',icon:'video',color:'sky',questions:videoAIQuestions},
  {id:'online-scams',title:'Lừa đảo trực tuyến',desc:'Luyện cách xử lý phishing, giả mạo người quen, OTP và yêu cầu chuyển tiền.',icon:'shield',color:'peach',questions:onlineScamQuestions},
];
const helpCases=[
 {title:'Tôi vừa bấm một đường link lạ',steps:['<strong>Dừng thao tác.</strong> Không nhập dữ liệu, cấp quyền hay cài tệp do trang yêu cầu; đóng trang.','Nếu đã tải tệp, đừng mở hoặc chạy tệp đó. Nếu đã cài ứng dụng hay cấp quyền lạ, nhờ người lớn hoặc người hỗ trợ kỹ thuật kiểm tra thiết bị.','Chỉ bấm link không tự động có nghĩa tài khoản đã bị chiếm. Nếu đã nhập thông tin, xem hướng dẫn bên dưới; kiểm tra cập nhật trình duyệt và hệ thống.']},
 {title:'Tôi đã lộ mật khẩu, OTP hoặc mất tài khoản',steps:['<strong>Tự mở ứng dụng hoặc trang chính thức</strong> trên thiết bị tin cậy; không dùng link người lạ gửi. Đổi mật khẩu và đăng xuất các phiên không nhận ra.','Kiểm tra email, số điện thoại khôi phục, quyền ứng dụng kết nối; bật xác thực hai bước. Đổi mật khẩu ở những tài khoản khác nếu đã dùng chung.','Nếu không còn đăng nhập được, dùng quy trình khôi phục chính thức. Nếu lộ OTP giao dịch ngân hàng, liên hệ ngân hàng ngay cùng người lớn.','Báo người thân và bạn bè qua kênh khác nếu tài khoản có thể đang bị dùng để xin tiền.']},
 {title:'Tôi đã chuyển tiền',steps:['<strong>Không chuyển thêm</strong> dù người đó yêu cầu “phí lấy lại tiền” hay “phí mở khóa”.','Cùng người giám hộ liên hệ ngay ngân hàng hoặc dịch vụ thanh toán qua ứng dụng/số chính thức để báo giao dịch và hỏi biện pháp hỗ trợ. Việc thu hồi không được bảo đảm.','Giữ mã giao dịch, thời gian, số tiền và thông tin tài khoản nhận. Cùng người lớn trình báo cơ quan công an và báo cáo tài khoản trên nền tảng.','Cảnh giác người tự nhận có thể lấy lại tiền với một khoản phí trước.']},
 {title:'Tôi bị ghép mặt, tống tiền hoặc đe dọa',steps:['<strong>Không trả tiền, không gửi thêm ảnh/video</strong> và không đáp ứng yêu cầu giữ kín. Bạn xứng đáng được bảo vệ.','Tìm người giám hộ, giáo viên hoặc người lớn đáng tin cậy. Có thể gọi Tổng đài 111 để được tư vấn về bảo vệ trẻ em.','Ghi tên tài khoản, đường dẫn hồ sơ, thời điểm và lời đe dọa bằng chữ. Không tải xuống, chụp lại hay chuyển tiếp ảnh/video nhạy cảm của học sinh.','Báo cáo nội dung/tài khoản trên nền tảng; nhờ người lớn phối hợp nhà trường và cơ quan công an khi cần. Nếu có nguy hiểm trực tiếp, ưu tiên đến nơi an toàn với người lớn.']},
 {title:'Bạn tôi bị bêu xấu trong nhóm lớp',steps:['<strong>Đừng chuyển tiếp</strong> clip, ảnh hay tin đồn. Việc lan truyền có thể khiến bạn ấy bị tổn thương thêm.','Nhắn riêng để hỏi thăm, lắng nghe và không trách móc. Đừng đòi bạn ấy chứng minh bằng cách gửi nội dung nhạy cảm.','Cùng bạn ấy báo giáo viên, người giám hộ hoặc phòng tư vấn. Báo cáo bài đăng và đề nghị quản trị viên nhóm gỡ nội dung gây hại.','Không kết tội người trong clip khi chưa có bằng chứng; bảo vệ sự riêng tư của mọi người liên quan.']}
];
const sources=[
 {org:'NIST',title:'Nội dung tổng hợp bằng AI',desc:'Tổng quan về nguồn gốc, gắn nhãn và phát hiện nội dung AI.',url:'https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content'},
 {org:'FTC',title:'Giả giọng người thân',desc:'Cách xác minh độc lập khi cuộc gọi quen thuộc yêu cầu tiền.',url:'https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes'},
 {org:'UNICEF',title:'Bảo vệ trẻ em trên mạng',desc:'Thông tin về rủi ro và sự hỗ trợ của gia đình, nhà trường.',url:'https://www.unicef.org/protection/keeping-children-safe-online'},
 {org:'TỔNG ĐÀI 111',title:'Hỗ trợ bảo vệ trẻ em',desc:'Kênh tư vấn và tiếp nhận thông tin bảo vệ trẻ em tại Việt Nam.',url:'https://tongdai111.vn/'}
];

const aiWarnings = [
  {
    icon:'video',
    title:'Mạo danh người quen',
    desc:'Khuôn mặt và giọng nói quen thuộc được dùng để xin tiền hoặc mã xác thực.',
    color:'lavender',
    videoUrl:'https://www.youtube.com/watch?v=oHNqrvMgPxE',
    videoTitle:'Giả giọng, mặt người thân bằng Deepfake — VTV24',
    publisher:'VTV24',
  },
  {
    icon:'wallet',
    title:'Quảng cáo giả mạo',
    desc:'Clip người nổi tiếng hoặc tổ chức có thể bị dựng lại để mời chào quà, mua hàng hay đầu tư.',
    color:'sky',
    videoUrl:'https://www.youtube.com/watch?v=aoCq3eNU8QI',
    videoTitle:'AI biến các chiêu trò mùa sale thành bẫy — Báo Nghệ An',
    publisher:'Báo Nghệ An',
  },
  {
    icon:'message',
    title:'Tin giả gây hoang mang',
    desc:'Một video bịa đặt hoặc gắn mô tả sai có thể khiến tin đồn lan nhanh trong nhóm lớp.',
    color:'peach',
    videoUrl:'https://www.youtube.com/watch?v=2HZrs_qaxXs',
    videoTitle:'AI khiến lan truyền tin giả lên một cấp độ mới — VTV24',
    publisher:'VTV24',
  },
  {
    icon:'heart',
    title:'Ghép mặt để gây hại',
    desc:'Hình ảnh bị lợi dụng để bêu xấu, đe dọa hoặc ép buộc học sinh. Hãy tìm hỗ trợ sớm.',
    color:'mint',
    videoUrl:'https://www.youtube.com/watch?v=wQBkvHxZO3Q',
    videoTitle:'Cảnh báo ghép hình ảnh để tống tiền — VTV24',
    publisher:'VTV24',
  },
  {
    icon:'alert',
    title:'Rác mạng & Lạm dụng video AI',
    desc:'Nội dung AI kém chất lượng hoặc bị lạm dụng có thể gây nhiễu thông tin, câu tương tác và làm tổn thương người khác.',
    color:'lavender',
    videoUrl:'https://www.youtube.com/watch?v=rkNy_si44IQ',
    videoTitle:'Rác mạng & Lạm dụng video AI',
    publisher:'YouTube',
  },
  {
    icon:'video',
    title:'Lợi dụng lòng trắc ẩn để trục lợi',
    desc:'Hình ảnh và câu chuyện gây xúc động có thể bị dàn dựng để thúc giục người xem quyên góp hoặc chuyển tiền.',
    color:'sky',
    videoUrl:'https://www.youtube.com/watch?v=NbKCGaH2Emc',
    videoTitle:'Lợi dụng lòng trắc ẩn để trục lợi',
    publisher:'YouTube',
  },
  {
    icon:'message',
    title:'Nội dung ảo, rủi ro thật',
    desc:'Nội dung được tạo hoặc chỉnh sửa trên mạng vẫn có thể dẫn đến hậu quả thật khi người xem tin hoặc chia sẻ thiếu kiểm chứng.',
    color:'peach',
    videoUrl:'https://www.youtube.com/watch?v=loOqSPe2MYs',
    videoTitle:'Nội dung ảo, rủi ro thật',
    publisher:'YouTube',
  },
  {
    icon:'heart',
    title:'Mất tư duy vì lệ thuộc công nghệ',
    desc:'Phụ thuộc vào công nghệ để suy nghĩ và quyết định có thể làm giảm khả năng kiểm tra, phản biện và tự giải quyết vấn đề.',
    color:'mint',
    videoUrl:'https://www.youtube.com/watch?v=jMiKENhsCks',
    videoTitle:'Mất tư duy vì lệ thuộc công nghệ',
    publisher:'YouTube',
  },
];

window.StudentAntiscamData = Object.freeze({
  icon,
  lessons,
  scenarioImages,
  scenarios,
  questions,
  quizSets,
  helpCases,
  sources,
  aiWarnings,
});
})();
