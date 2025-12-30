import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'Chính sách bảo mật | TREOW Physiotherapy',
    description: 'Chính sách bảo mật thông tin cá nhân của TREOW Physiotherapy. Cam kết bảo vệ quyền riêng tư và dữ liệu của khách hàng.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-black text-text-main mb-4">Chính sách bảo mật</h1>
                <p className="text-text-sub mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>

                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">1. Giới thiệu</h2>
                        <p className="text-text-sub leading-relaxed mb-4">
                            TREOW Physiotherapy ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                        </p>
                        <p className="text-text-sub leading-relaxed">
                            Bằng cách sử dụng website và dịch vụ của chúng tôi, bạn đồng ý với các điều khoản trong chính sách bảo mật này.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">2. Thông tin chúng tôi thu thập</h2>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">2.1. Thông tin cá nhân</h3>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Khi bạn đặt lịch hẹn hoặc sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Họ và tên</li>
                            <li>Số điện thoại</li>
                            <li>Địa chỉ email</li>
                            <li>Ngày sinh</li>
                            <li>Thông tin y tế liên quan đến điều trị</li>
                            <li>Lịch sử điều trị và ghi chú lâm sàng</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">2.2. Thông tin tự động</h3>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Khi bạn truy cập website, chúng tôi tự động thu thập:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Địa chỉ IP</li>
                            <li>Loại trình duyệt và thiết bị</li>
                            <li>Thời gian truy cập</li>
                            <li>Trang web bạn truy cập</li>
                            <li>Cookies và công nghệ theo dõi tương tự</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi sử dụng thông tin của bạn để:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Cung cấp và quản lý dịch vụ điều trị</li>
                            <li>Xác nhận và quản lý lịch hẹn</li>
                            <li>Liên lạc với bạn về dịch vụ</li>
                            <li>Gửi thông tin y tế và lời khuyên chăm sóc sức khỏe</li>
                            <li>Cải thiện chất lượng dịch vụ</li>
                            <li>Tuân thủ các yêu cầu pháp lý</li>
                            <li>Phân tích và nghiên cứu để cải thiện dịch vụ</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">4. Chia sẻ thông tin</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li><strong>Với sự đồng ý của bạn:</strong> Khi bạn cho phép chúng tôi chia sẻ thông tin</li>
                            <li><strong>Nhà cung cấp dịch vụ:</strong> Với các đối tác cung cấp dịch vụ hỗ trợ (email, lưu trữ dữ liệu)</li>
                            <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi pháp luật hoặc cơ quan có thẩm quyền</li>
                            <li><strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền lợi, tài sản hoặc an toàn của chúng tôi và khách hàng</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">5. Bảo mật thông tin</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Mã hóa dữ liệu khi truyền tải (SSL/TLS)</li>
                            <li>Lưu trữ an toàn trên máy chủ được bảo vệ</li>
                            <li>Kiểm soát truy cập nghiêm ngặt</li>
                            <li>Đào tạo nhân viên về bảo mật thông tin</li>
                            <li>Sao lưu dữ liệu định kỳ</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">6. Quyền của bạn</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Bạn có các quyền sau đối với thông tin cá nhân của mình:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li><strong>Quyền truy cập:</strong> Yêu cầu bản sao thông tin cá nhân của bạn</li>
                            <li><strong>Quyền sửa đổi:</strong> Yêu cầu chỉnh sửa thông tin không chính xác</li>
                            <li><strong>Quyền xóa:</strong> Yêu cầu xóa thông tin cá nhân (trong một số trường hợp)</li>
                            <li><strong>Quyền hạn chế:</strong> Yêu cầu hạn chế xử lý thông tin</li>
                            <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý thông tin cho mục đích marketing</li>
                            <li><strong>Quyền rút lại đồng ý:</strong> Rút lại sự đồng ý bất cứ lúc nào</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">7. Cookies</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Website của chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng. Cookies là các file nhỏ được lưu trữ trên thiết bị của bạn.
                        </p>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi sử dụng cookies cho:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Ghi nhớ tùy chọn của bạn</li>
                            <li>Phân tích lưu lượng truy cập website</li>
                            <li>Cải thiện hiệu suất website</li>
                        </ul>
                        <p className="text-text-sub leading-relaxed mt-3">
                            Bạn có thể từ chối cookies thông qua cài đặt trình duyệt của mình.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">8. Lưu trữ thông tin</h2>
                        <p className="text-text-sub leading-relaxed">
                            Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để cung cấp dịch vụ và tuân thủ các nghĩa vụ pháp lý. Hồ sơ y tế được lưu trữ theo quy định của pháp luật về hồ sơ bệnh án.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">9. Thay đổi chính sách</h2>
                        <p className="text-text-sub leading-relaxed">
                            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được đăng tải trên trang này với ngày cập nhật mới. Chúng tôi khuyến khích bạn xem lại chính sách này định kỳ.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">10. Liên hệ</h2>
                        <p className="text-text-sub leading-relaxed mb-4">
                            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
                        </p>
                        <div className="bg-primary/5 rounded-lg p-4">
                            <p className="text-text-main font-bold mb-2">TREOW Physiotherapy</p>
                            <p className="text-text-sub">Email: contact@treowclinic.com</p>
                            <p className="text-text-sub">Điện thoại: +447882843513</p>
                            <p className="text-text-sub">Địa chỉ: Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
