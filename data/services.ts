export interface ServiceDetail {
    id: string;
    slug: string;
    icon: string;
    image: string;
    title: string;
    shortDescription: string;
    description: string;
    painPoints: {
        title: string;
        items: string[];
    };
    solutions: {
        title: string;
        items: string[];
    };
    benefits: string[];
}

export const servicesData: ServiceDetail[] = [
    {
        id: "co-xuong-khop",
        slug: "co-xuong-khop",
        icon: "accessibility_new",
        image: "/images/services/co-xuong-khop.jpg",
        title: "Cơ xương khớp",
        shortDescription: "Điều trị đau lưng, cổ vai gáy, thoát vị đĩa đệm và phục hồi chức năng sau chấn thương thể thao.",
        description: "Chuyên khoa Cơ xương khớp tại TREOW tập trung vào việc chẩn đoán và điều trị các rối loạn ảnh hưởng đến hệ thống vận động của cơ thể. Chúng tôi kết hợp các phương pháp vật lý trị liệu tiên tiến với phác đồ điều trị cá nhân hóa để giúp bạn phục hồi nhanh chóng và bền vững.",
        painPoints: {
            title: "Bạn đang gặp phải vấn đề gì?",
            items: [
                "Đau lưng dai dẳng, đau cổ vai gáy do ngồi văn phòng lâu.",
                "Thoát vị đĩa đệm gây tê bì chân tay, hạn chế vận động.",
                "Đau khớp gối, khớp háng khi đi lại hoặc lên xuống cầu thang.",
                "Chấn thương thể thao: bong gân, rách dây chằng, trật khớp.",
                "Cứng khớp buổi sáng, khó khăn trong sinh hoạt hàng ngày."
            ]
        },
        solutions: {
            title: "Giải pháp của TREOW",
            items: [
                "Trị liệu bằng tay (Manual Therapy) để nắn chỉnh khớp và giải phóng cơ.",
                "Công nghệ giảm áp cột sống không phẫu thuật.",
                "Siêu âm trị liệu, điện xung giúp giảm đau và viêm.",
                "Bài tập vận động trị liệu chuyên sâu để tăng cường sức mạnh cơ bắp.",
                "Tư vấn tư thế sinh hoạt và làm việc đúng để ngăn ngừa tái phát."
            ]
        },
        benefits: [
            "Giảm đau nhanh chóng không dùng thuốc.",
            "Phục hồi tầm vận động linh hoạt.",
            "Ngăn ngừa phẫu thuật không cần thiết.",
            "Nâng cao chất lượng cuộc sống và hiệu suất làm việc."
        ]
    },
    {
        id: "thai-ky",
        slug: "thai-ky",
        icon: "pregnant_woman",
        image: "/images/services/thai-ky-new.jpg",
        title: "Thai kỳ",
        shortDescription: "Giảm đau lưng, phù nề, cải thiện tư thế và các bài tập chuẩn bị cho cuộc vượt cạn an toàn.",
        description: "Mang thai là hành trình thiêng liêng nhưng cũng đầy thử thách với cơ thể người mẹ. Dịch vụ Vật lý trị liệu Thai kỳ của chúng tôi được thiết kế để chăm sóc sức khỏe toàn diện cho mẹ bầu, giảm thiểu các khó chịu và chuẩn bị tốt nhất cho quá trình sinh nở.",
        painPoints: {
            title: "Nỗi lo của mẹ bầu",
            items: [
                "Đau lưng dưới, đau xương chậu, đau thần kinh tọa khi thai lớn.",
                "Phù nề chân tay, chuột rút về đêm.",
                "Mệt mỏi, khó ngủ, căng thẳng lo âu.",
                "Tư thế đi lại khó khăn, nặng nề.",
                "Lo lắng về quá trình chuyển dạ và phục hồi sau sinh."
            ]
        },
        solutions: {
            title: "Đồng hành cùng mẹ bầu",
            items: [
                "Massage trị liệu chuyên sâu cho bà bầu giúp thư giãn và giảm đau.",
                "Bài tập Pilates/Yoga bầu giúp cải thiện tư thế và sức bền.",
                "Kỹ thuật dẫn lưu hệ bạch huyết giảm phù nề.",
                "Hướng dẫn cách thở và rặn sinh hiệu quả.",
                "Chăm sóc phục hồi sàn chậu sau sinh."
            ]
        },
        benefits: [
            "Giảm đau nhức cơ xương khớp thai kỳ.",
            "Cải thiện tuần hoàn máu, giảm phù nề.",
            "Tinh thần thư thái, ngủ ngon hơn.",
            "Vượt cạn dễ dàng và an toàn hơn.",
            "Vóc dáng nhanh chóng phục hồi sau sinh."
        ]
    },
    {
        id: "vat-ly-tri-lieu-nhi",
        slug: "vat-ly-tri-lieu-nhi",
        icon: "child_care",
        image: "/images/services/nhi.jpg",
        title: "Vật lý trị liệu Nhi",
        shortDescription: "Can thiệp sớm vẹo cổ, bàn chân bẹt, chậm phát triển vận động giúp trẻ phát triển toàn diện.",
        description: "Trẻ em không phải là người lớn thu nhỏ, do đó cần có phương pháp tiếp cận riêng biệt. Khoa Vật lý trị liệu Nhi của TREOW giúp phát hiện sớm và can thiệp kịp thời các vấn đề về vận động và phát triển ở trẻ, tạo nền tảng vững chắc cho tương lai.",
        painPoints: {
            title: "Cha mẹ đang lo lắng điều gì?",
            items: [
                "Trẻ bị vẹo cổ (tật vẹo cổ bẩm sinh), đầu hay nghiêng một bên.",
                "Bàn chân bẹt, dáng đi xấu, hay vấp ngã.",
                "Chân vòng kiềng (chân chữ O), chân chữ X.",
                "Chậm lẫy, chậm bò, chậm đi so với lứa tuổi.",
                "Trẻ gù lưng, cong vẹo cột sống do tư thế học tập sai."
            ]
        },
        solutions: {
            title: "Phương pháp can thiệp sớm",
            items: [
                "Bài tập vận động thô và tinh phù hợp với mốc phát triển.",
                "Kỹ thuật kéo giãn và nắn chỉnh nhẹ nhàng cho trẻ vẹo cổ.",
                "Bài tập chỉnh dáng đi và tư thế bàn chân.",
                "Hướng dẫn cha mẹ cách tập luyện và vui chơi cùng con tại nhà.",
                "Sử dụng dụng cụ hỗ trợ chỉnh hình khi cần thiết."
            ]
        },
        benefits: [
            "Khắc phục sớm các dị tật bẩm sinh.",
            "Giúp trẻ đạt được các mốc phát triển vận động đúng hạn.",
            "Cải thiện dáng đi và tư thế thẩm mỹ.",
            "Tăng cường sự tự tin và hòa nhập cho trẻ.",
            "Ngăn ngừa các biến chứng xương khớp khi trưởng thành."
        ]
    },
    {
        id: "ho-hap",
        slug: "ho-hap",
        icon: "pulmonology",
        image: "/images/services/ho-hap.jpg",
        title: "Hô hấp",
        shortDescription: "Phục hồi chức năng hô hấp sau viêm phổi, hen suyễn, tăng cường dung tích phổi.",
        description: "Hô hấp khỏe mạnh là nền tảng của sự sống. Dịch vụ Phục hồi chức năng Hô hấp giúp cải thiện khả năng thông khí, làm sạch đường thở và tăng cường sức bền cho hệ hô hấp, đặc biệt quan trọng sau các bệnh lý phổi hoặc phẫu thuật.",
        painPoints: {
            title: "Các vấn đề hô hấp thường gặp",
            items: [
                "Khó thở, hụt hơi khi gắng sức hoặc leo cầu thang.",
                "Ho kéo dài, đờm ứ đọng khó khạc ra.",
                "Di chứng sau viêm phổi, COVID-19.",
                "Hen suyễn, bệnh phổi tắc nghẽn mãn tính (COPD).",
                "Thở nông, kém hiệu quả do thói quen hoặc căng thẳng."
            ]
        },
        solutions: {
            title: "Liệu pháp hô hấp chuyên sâu",
            items: [
                "Kỹ thuật tập thở hoành, thở chúm môi để tăng thông khí.",
                "Vỗ rung lồng ngực và dẫn lưu tư thế để tống đờm.",
                "Bài tập giãn nở lồng ngực và tăng sức mạnh cơ hô hấp.",
                "Điều chỉnh tư thế để tối ưu hóa hô hấp.",
                "Hướng dẫn kiểm soát nhịp thở khi vận động."
            ]
        },
        benefits: [
            "Giảm khó thở, cải thiện oxy máu.",
            "Làm sạch đường thở, giảm nguy cơ nhiễm trùng tái phát.",
            "Tăng khả năng gắng sức và sức bền thể chất.",
            "Giảm phụ thuộc vào thuốc giãn phế quản.",
            "Cải thiện giấc ngủ và tinh thần."
        ]
    },
    {
        id: "tieu-hoa",
        slug: "tieu-hoa",
        icon: "sentiment_satisfied",
        image: "/images/services/tieu-hoa.jpg",
        title: "Tăng cường sinh lý nam",
        shortDescription: "Cải thiện sức khỏe sinh lý nam giới một cách tự nhiên thông qua vật lý trị liệu, phục hồi chức năng sàn chậu và tăng cường tuần hoàn.",
        description: "Rối loạn chức năng sinh lý nam giới không chỉ là vấn đề nội tiết mà còn liên quan mật thiết đến hệ cơ xương khớp, đặc biệt là vùng sàn chậu và sự tuần hoàn máu. Tại TREOW, chúng tôi sử dụng các phương pháp vật lý trị liệu chuyên sâu để giải quyết nguyên nhân gốc rễ, giúp bạn lấy lại bản lĩnh phái mạnh một cách an toàn và bền vững, không phụ thuộc thuốc.",
        painPoints: {
            title: "Những vấn đề thầm kín khó nói",
            items: [
                "Rối loạn cương dương, xuất tinh sớm do căng thẳng hoặc yếu cơ sàn chậu.",
                "Đau vùng chậu mãn tính, đau khi quan hệ.",
                "Giảm ham muốn, mệt mỏi, thiếu năng lượng.",
                "Các vấn đề về kiểm soát tiểu tiện, tuyến tiền liệt.",
                "Tự ti, lo lắng ảnh hưởng đến hạnh phúc gia đình."
            ]
        },
        solutions: {
            title: "Giải pháp Y học Tự nhiên từ TREOW",
            items: [
                "Bài tập Kegel chuyên sâu và Biofeedback tăng cường sức mạnh sàn chậu.",
                "Kỹ thuật Manual Therapy giải phóng chèn ép thần kinh vùng chậu.",
                "Sóng xung kích (Shockwave) kích thích tái tạo mạch máu và mô cương.",
                "Tư vấn bài tập và lối sống tăng cường Testosterone tự nhiên.",
                "Liệu pháp thư giãn cơ và giảm căng thẳng tâm lý."
            ]
        },
        benefits: [
            "Cải thiện khả năng cương cứng và kiểm soát xuất tinh.",
            "Giảm đau và khó chịu vùng chậu.",
            "Tăng cường sự tự tin và chất lượng đời sống tình dục.",
            "Giải pháp tự nhiên, an toàn, không tác dụng phụ.",
            "Nâng cao sức khỏe tổng thể và sự dẻo dai."
        ]
    },
    {
        id: "dau-man-tinh",
        slug: "dau-man-tinh",
        icon: "healing",
        image: "/images/services/dau-man-tinh.jpg",
        title: "Đau mãn tính",
        shortDescription: "Kiểm soát và giảm đau không dùng thuốc, nâng cao chất lượng cuộc sống cho người bệnh.",
        description: "Đau mãn tính không chỉ là cảm giác thể xác mà còn ảnh hưởng sâu sắc đến tâm lý và cuộc sống. Chúng tôi tiếp cận đau mãn tính theo mô hình đa phương thức, giúp bạn kiểm soát cơn đau và tìm lại niềm vui sống.",
        painPoints: {
            title: "Cơn đau đang chi phối cuộc sống bạn?",
            items: [
                "Đau dai dẳng kéo dài trên 3 tháng không rõ nguyên nhân.",
                "Đau đầu, đau nửa đầu (Migraine) tái phát thường xuyên.",
                "Đau xơ cơ (Fibromyalgia), đau toàn thân, mệt mỏi.",
                "Đau sau zona thần kinh hoặc chấn thương cũ.",
                "Phụ thuộc thuốc giảm đau, lo lắng về tác dụng phụ."
            ]
        },
        solutions: {
            title: "Chiến lược kiểm soát đau toàn diện",
            items: [
                "Kết hợp Vật lý trị liệu, Điện trị liệu và Nhiệt trị liệu.",
                "Liệu pháp nhận thức hành vi và thư giãn giảm căng thẳng.",
                "Kỹ thuật giải phóng điểm kích hoạt (Trigger Point Therapy).",
                "Châm cứu y học cổ truyền kết hợp hiện đại.",
                "Chương trình tập luyện thích nghi nâng cao ngưỡng chịu đau."
            ]
        },
        benefits: [
            "Giảm mức độ và tần suất cơn đau.",
            "Giảm hoặc ngưng sử dụng thuốc giảm đau.",
            "Cải thiện giấc ngủ và tâm trạng.",
            "Tự tin trở lại với công việc và sở thích.",
            "Làm chủ cơ thể và cuộc sống của chính mình."
        ]
    }
];
