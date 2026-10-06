import { Project, Benefit, WhyReason, ContactInfo } from './types';

export const contactData: ContactInfo = {
  name: 'Minh Thu',
  role: 'Nhân Viên Kinh Doanh BĐS Hạ Long',
  phone: '0395655882',
  phoneDisplay: '0395 655 882',
  slogan: 'Thông tin rõ ràng – Tư vấn đúng nhu cầu – Đồng hành cùng khách hàng.',
  zaloChatUrl: 'https://zalo.me/0395655882',
  email: 'cskhbdshalong29062026@gmail.com',
  projectsSummary: 'Sun Centro Town | Sun Festo Town | Aria Bay | Prima Bay | Imperia Holiday The Bay Side'
};

export const aboutMinhThu = {
  name: 'Minh Thu',
  title: 'Nhân viên kinh doanh & phân phối BĐS Hạ Long',
  bio: 'Minh Thu tập trung tư vấn các sản phẩm bất động sản tại Hạ Long, hỗ trợ khách hàng từ bước tìm hiểu dự án, lựa chọn sản phẩm đến quá trình giao dịch.',
  focusPoints: [
    {
      step: '01',
      title: 'THÔNG TIN RÕ RÀNG',
      description: 'Giúp khách hàng dễ hiểu và dễ so sánh thông tin dự án.'
    },
    {
      step: '02',
      title: 'TƯ VẤN THEO NHU CẦU',
      description: 'Không phải khách hàng nào cũng có cùng mục tiêu và ngân sách.'
    },
    {
      step: '03',
      title: 'ĐỒNG HÀNH CÙNG KHÁCH HÀNG',
      description: 'Hỗ trợ trong quá trình khách hàng tìm hiểu và lựa chọn sản phẩm.'
    }
  ]
};

export const benefitsData: Benefit[] = [
  {
    id: 'b1',
    title: 'Tư vấn chọn dự án',
    description: 'So sánh các dự án theo nhu cầu, ngân sách và mục tiêu sử dụng.',
    iconName: 'Building2'
  },
  {
    id: 'b2',
    title: 'Phân tích tài chính',
    description: 'Hỗ trợ khách hàng hình dung số vốn ban đầu, tiến độ thanh toán và dòng tiền dự kiến.',
    iconName: 'DollarSign'
  },
  {
    id: 'b3',
    title: 'Tìm căn phù hợp',
    description: 'Lọc sản phẩm theo vị trí, diện tích, hướng, tầng, tầm nhìn và ngân sách.',
    iconName: 'Home'
  },
  {
    id: 'b4',
    title: 'So sánh dự án',
    description: 'Tổng hợp thông tin để khách hàng dễ dàng cân nhắc giữa các lựa chọn.',
    iconName: 'BarChart3'
  },
  {
    id: 'b5',
    title: 'Cập nhật chính sách',
    description: 'Cập nhật bảng giá, chính sách bán hàng và quỹ căn khi có thông tin mới từ chủ đầu tư.',
    iconName: 'FileText'
  },
  {
    id: 'b6',
    title: 'Đồng hành giao dịch',
    description: 'Hỗ trợ khách hàng trong quá trình lựa chọn và thực hiện giao dịch.',
    iconName: 'ShieldCheck'
  }
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    name: 'Sun Centro Town',
    status: 'new',
    description: 'Quần thể nhà phố thương mại & shophouse đẳng cấp tại tâm điểm du lịch Bãi Cháy, liền kề tổ hợp vui chơi giải trí Sun World Hạ Long, đón đầu dòng khách du lịch sôi động bốn mùa.',
    location: 'Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    developer: 'Sun Group',
    highlights: [
      'Tọa độ vàng tại trung tâm Bãi Cháy kề cận Sun World Hạ Long',
      'Thiết kế shophouse tối ưu công năng kinh doanh, lưu trú & F&B',
      'Chính sách thanh toán linh hoạt, tiềm năng tăng giá vượt trội'
    ],
    image: 'https://i.postimg.cc/zGS68tVq/sun-centro-town-4.jpg',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 3 - 12 Tỷ/căn',
    category: 'Nhà phố thương mại'
  },
  {
    id: 'p2',
    name: 'Sun Festo Town',
    status: 'active',
    description: 'Tuyến phố thương mại mang phong cách lễ hội rực rỡ bên bờ vịnh kỳ quan Bãi Cháy. Địa điểm lý tưởng để kinh doanh chuỗi ẩm thực, boutique hotel hay homestay cao cấp phục vụ khách du lịch.',
    location: 'Trục đại lộ lễ hội Bãi Cháy, TP. Hạ Long',
    developer: 'Sun Group',
    highlights: [
      'Tuyến phố mua sắm lễ hội không ngủ sầm uất hàng đầu Hạ Long',
      'Kiến trúc phóng khoáng, mặt tiền kinh doanh rộng thoáng hút khách',
      'Suất đầu tư sinh lời kép: Dòng tiền khai thác cho thuê & lãi vốn'
    ],
    image: 'https://i.postimg.cc/htb6cyf4/Sun-Festo-Town-Ha-Long.png',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 7 – 15 Tỷ/căn',
    category: 'Nhà phố nghỉ dưỡng'
  },
  {
    id: 'p3',
    name: 'Aria Bay Hạ Long',
    status: 'active',
    description: 'Tòa tháp căn hộ nghỉ dưỡng cao cấp trực diện vịnh di sản thiên nhiên thế giới, mang đến tầm nhìn triệu đô panorama ôm trọn biển trời và cảnh sắc đảo đá kỳ vĩ của Hạ Long.',
    location: 'Bán đảo du lịch Marina, Bãi Cháy, TP. Hạ Long',
    developer: 'Tập đoàn uy tín',
    highlights: [
      'Tầm view 360 độ trực diện vịnh di sản thiên nhiên thế giới',
      'Hệ tiện ích chuẩn resort 5 sao: Sky bar, bể bơi vô cực, lounge sang trọng',
      'Căn hộ chìa khóa trao tay, tối ưu hiệu suất khai thác cho thuê nghỉ dưỡng'
    ],
    image: 'https://i.postimg.cc/g2qQmSnd/aria-bay.jpg',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 2.5 – 6.5 Tỷ/căn',
    category: 'Căn hộ view vịnh'
  },
  {
    id: 'p4',
    name: 'Prima Bay Hạ Long',
    status: 'new',
    description: 'Tổ hợp căn hộ mặt biển và shophouse phong cách resort hiện đại ngay bên bờ vịnh xanh. Thiết kế ban công kính giật cấp thông minh hứng trọn nắng gió vịnh biển trong lành.',
    location: 'Bán đảo Hạ Long Marina, Hoàng Quốc Việt, TP. Hạ Long',
    developer: 'Chủ đầu tư uy tín',
    highlights: [
      'Vị trí sát bờ biển hiếm hoi còn lại tại trung tâm du lịch Hạ Long',
      'Không gian sinh thái nghỉ dưỡng khép kín với bãi biển cát trắng riêng biệt',
      'Hỗ trợ lãi suất ngân hàng 0%, quà tặng mở bán đợt 1 hấp dẫn'
    ],
    image: 'https://i.postimg.cc/htb6cyfn/phoi-canh-prima-bay-ha-long.jpg',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 2.8 – 7.0 Tỷ/căn',
    category: 'Căn hộ mặt biển'
  },
  {
    id: 'p5',
    name: 'Imperia Holiday Hạ Long',
    status: 'active',
    description: 'Siêu dự án căn hộ nghỉ dưỡng theo mô hình All-in-One được bảo chứng bởi nhà phát triển danh tiếng MIK Group. Kiến tạo chuẩn sống thượng lưu cùng tiềm năng khai thác bền vững.',
    location: 'Hạ Long Marina, P. Bãi Cháy, TP. Hạ Long',
    developer: 'MIK Group',
    highlights: [
      'Bảo chứng chất lượng xây dựng & tiến độ bởi thương hiệu MIK Group',
      'Hơn 68 tiện ích đặc quyền: Hồ bơi ốc đảo, câu lạc bộ biển, spa cao cấp',
      'Đơn vị quản lý vận hành chuẩn quốc tế, tỷ lệ lấp đầy phòng luôn ở mức cao'
    ],
    image: 'https://i.postimg.cc/Hk4RdZVg/imperia-holiday-ha-long-1.jpg',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 2.6 – 5.8 Tỷ/căn',
    category: 'Căn hộ nghỉ dưỡng 5 sao'
  },
  {
    id: 'p6',
    name: 'The Bay Side',
    status: 'active',
    description: 'Bộ sưu tập căn hộ cao cấp và penthouse tọa lạc trên cung đường bao biển di sản đẹp bậc nhất Việt Nam. Nơi khẳng định phong cách sống danh gia và bảo toàn tài sản truyền đời.',
    location: 'Đường bao biển Trần Quốc Nghiễn, TP. Hạ Long',
    developer: 'MIK Group / Đối tác uy tín',
    highlights: [
      'Vị trí độc bản trên cung đường bao biển di sản đắt giá nhất Hạ Long',
      'Tầm nhìn không giới hạn thu trọn hoàng hôn và vịnh biển kỳ quan',
      'Cộng đồng cư dân tinh hoa, số lượng căn hộ giới hạn cực kỳ quý hiếm'
    ],
    image: 'https://i.postimg.cc/Z5F247C4/phoi-canh-imperia-holiday-mik-scaled.webp',
    ctaText: 'Xem chi tiết & Nhận bảng giá',
    priceEstimate: 'Từ 3.5 – 9.5 Tỷ/căn',
    category: 'Căn hộ hạng sang'
  }
];

export const reasonsData: WhyReason[] = [
  {
    id: 'r1',
    title: 'TƯ VẤN THEO NHU CẦU',
    text: 'Không chỉ gửi bảng giá, mà xác định khách đang cần mua để ở, nghỉ dưỡng hay đầu tư.',
    highlightText: 'Đúng nhu cầu'
  },
  {
    id: 'r2',
    title: 'THÔNG TIN DỄ HIỂU',
    text: 'Tổng hợp thông tin dự án theo cách đơn giản, dễ so sánh.',
    highlightText: 'Rõ ràng'
  },
  {
    id: 'r3',
    title: 'HỖ TRỢ LỌC SẢN PHẨM',
    text: 'Giúp khách khoanh vùng căn phù hợp với ngân sách và nhu cầu.',
    highlightText: 'Tối ưu ngân sách'
  },
  {
    id: 'r4',
    title: 'HỖ TRỢ TRONG QUÁ TRÌNH GIAO DỊCH',
    text: 'Đồng hành xuyên suốt quá trình khách hàng tìm hiểu và giao dịch.',
    highlightText: 'Đồng hành bền vững'
  }
];

