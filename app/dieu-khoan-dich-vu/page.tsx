import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: 'Điều khoản dịch vụ | TREOW Physiotherapy',
    description: 'Điều khoản và điều kiện sử dụng dịch vụ của TREOW Physiotherapy. Quy định về quyền và trách nhiệm của khách hàng.',
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background-light">
            <Header />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-black text-text-main mb-4">Điều khoản dịch vụ</h1>
                <p className="text-text-sub mb-8">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>

                <div className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">1. Chấp nhận điều khoản</h2>
                        <p className="text-text-sub leading-relaxed mb-4">
                            Bằng cách truy cập và sử dụng website và dịch vụ của TREOW Physiotherapy ("chúng tôi", "của chúng tôi"), bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây.
                        </p>
                        <p className="text-text-sub leading-relaxed">
                            Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">2. Dịch vụ của chúng tôi</h2>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">2.1. Phạm vi dịch vụ</h3>
                        <p className="text-text-sub leading-relaxed mb-3">
                            TREOW Physiotherapy cung cấp các dịch vụ vật lý trị liệu chuyên nghiệp bao gồm:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Điều trị cơ xương khớp</li>
                            <li>Phục hồi chức năng</li>
                            <li>Y học thể thao</li>
                            <li>Điều trị đau mãn tính</li>
                            <li>Tăng cường sinh lý nam</li>
                            <li>Tư vấn sức khỏe</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">2.2. Không phải lời khuyên y tế</h3>
                        <p className="text-text-sub leading-relaxed">
                            Thông tin trên website chỉ mang tính chất tham khảo và không thay thế cho lời khuyên y tế chuyên nghiệp. Luôn tham khảo ý kiến bác sĩ hoặc chuyên gia y tế trước khi bắt đầu bất kỳ liệu trình điều trị nào.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">3. Đặt lịch hẹn</h2>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">3.1. Quy trình đặt lịch</h3>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Đặt lịch qua website hoặc điện thoại</li>
                            <li>Xác nhận lịch hẹn qua điện thoại hoặc email</li>
                            <li>Đến đúng giờ hẹn đã được xác nhận</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">3.2. Hủy và đổi lịch</h3>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Thông báo hủy/đổi lịch ít nhất 24 giờ trước</li>
                            <li>Hủy muộn hoặc không đến có thể bị tính phí</li>
                            <li>Liên hệ qua điện thoại hoặc email để hủy/đổi lịch</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">3.3. Chính sách không đến</h3>
                        <p className="text-text-sub leading-relaxed">
                            Nếu bạn không đến buổi hẹn mà không thông báo trước, chúng tôi có quyền tính phí hoặc yêu cầu thanh toán trước cho các lịch hẹn tiếp theo.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">4. Thanh toán và phí dịch vụ</h2>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">4.1. Phí dịch vụ</h3>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Phí dịch vụ được niêm yết trên website và tại phòng khám</li>
                            <li>Chúng tôi có quyền thay đổi phí dịch vụ với thông báo trước</li>
                            <li>Phí tư vấn lần đầu có thể khác với phí tái khám</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">4.2. Phương thức thanh toán</h3>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Tiền mặt</li>
                            <li>Chuyển khoản ngân hàng</li>
                            <li>Thanh toán sau mỗi buổi điều trị</li>
                        </ul>

                        <h3 className="text-xl font-bold text-text-main mb-3 mt-6">4.3. Hoàn tiền</h3>
                        <p className="text-text-sub leading-relaxed">
                            Phí dịch vụ đã thanh toán không được hoàn lại, trừ trường hợp đặc biệt được chúng tôi chấp thuận.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">5. Trách nhiệm của khách hàng</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Cung cấp thông tin chính xác và đầy đủ về tình trạng sức khỏe</li>
                            <li>Thông báo về bất kỳ thay đổi nào trong tình trạng sức khỏe</li>
                            <li>Tuân thủ hướng dẫn điều trị của chuyên gia</li>
                            <li>Thông báo nếu có bất kỳ phản ứng bất thường nào</li>
                            <li>Thanh toán đầy đủ và đúng hạn</li>
                            <li>Tôn trọng nhân viên và khách hàng khác</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">6. Trách nhiệm của chúng tôi</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi cam kết:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Cung cấp dịch vụ chuyên nghiệp và chất lượng cao</li>
                            <li>Bảo mật thông tin cá nhân và y tế của bạn</li>
                            <li>Duy trì môi trường sạch sẽ và an toàn</li>
                            <li>Tuân thủ các tiêu chuẩn y tế và đạo đức nghề nghiệp</li>
                            <li>Lắng nghe và giải đáp thắc mắc của bạn</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">7. Giới hạn trách nhiệm</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi không chịu trách nhiệm cho:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2 mb-4">
                            <li>Kết quả điều trị không như mong đợi do đặc điểm cá nhân</li>
                            <li>Tổn thương hoặc biến chứng do không tuân thủ hướng dẫn</li>
                            <li>Thông tin không chính xác do khách hàng cung cấp</li>
                            <li>Gián đoạn dịch vụ do sự kiện bất khả kháng</li>
                        </ul>
                        <p className="text-text-sub leading-relaxed">
                            Trách nhiệm của chúng tôi bị giới hạn ở mức phí dịch vụ mà bạn đã thanh toán.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">8. Quyền sở hữu trí tuệ</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Tất cả nội dung trên website (văn bản, hình ảnh, logo, video) thuộc quyền sở hữu của TREOW Physiotherapy và được bảo vệ bởi luật sở hữu trí tuệ.
                        </p>
                        <p className="text-text-sub leading-relaxed">
                            Bạn không được sao chép, phân phối hoặc sử dụng nội dung cho mục đích thương mại mà không có sự cho phép bằng văn bản.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">9. Bảo mật thông tin</h2>
                        <p className="text-text-sub leading-relaxed">
                            Chúng tôi cam kết bảo vệ thông tin cá nhân và y tế của bạn theo <Link href="/chinh-sach-bao-mat" className="text-primary font-medium hover:underline">Chính sách bảo mật</Link> của chúng tôi.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">10. Chấm dứt dịch vụ</h2>
                        <p className="text-text-sub leading-relaxed mb-3">
                            Chúng tôi có quyền từ chối hoặc chấm dứt dịch vụ nếu:
                        </p>
                        <ul className="list-disc list-inside text-text-sub space-y-2">
                            <li>Vi phạm điều khoản dịch vụ</li>
                            <li>Hành vi không phù hợp hoặc gây rối</li>
                            <li>Không thanh toán phí dịch vụ</li>
                            <li>Cung cấp thông tin sai lệch</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">11. Thay đổi điều khoản</h2>
                        <p className="text-text-sub leading-relaxed">
                            Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận các điều khoản mới.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">12. Luật áp dụng</h2>
                        <p className="text-text-sub leading-relaxed">
                            Các điều khoản này được điều chỉnh bởi pháp luật Vương quốc Anh. Mọi tranh chấp phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại UK.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-text-main mb-4">13. Liên hệ</h2>
                        <p className="text-text-sub leading-relaxed mb-4">
                            Nếu bạn có bất kỳ câu hỏi nào về điều khoản dịch vụ này, vui lòng liên hệ:
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
