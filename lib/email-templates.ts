
import { Booking } from "@/types";

export const generateAdminBookingEmail = (booking: Booking) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #089191; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Thông Báo Đặt Lịch Mới</h2>
        </div>
        <div style="padding: 20px;">
            <p>Xin chào Admin,</p>
            <p>Hệ thống vừa nhận được một yêu cầu đặt lịch mới. Dưới đây là thông tin chi tiết:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Khách hàng</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${booking.fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Số điện thoại</td>
                    <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${booking.phone}" style="color: #089191; text-decoration: none;">${booking.phone}</a></td>
                </tr>
                 <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${booking.email || 'Không cung cấp'}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Dịch vụ</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${booking.service}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Thời gian</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${booking.time} - ${new Date(booking.date).toLocaleDateString('vi-VN')}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Ghi chú</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${booking.message || 'Không có'}</td>
                </tr>
            </table>

            <div style="margin-top: 25px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/bookings" style="background-color: #089191; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Truy cập Admin Dashboard</a>
            </div>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>Đây là email tự động từ hệ thống PhysioCare (TREOW).</p>
        </div>
    </div>
    `;
};

export const generateCustomerBookingEmail = (booking: Booking) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #089191; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Xác Nhận Đặt Lịch Thành Công</h2>
        </div>
        <div style="padding: 20px;">
            <p>Xin chào <strong>${booking.fullName}</strong>,</p>
            <p>Cảm ơn bạn đã tin tưởng và đặt lịch tại <strong>Phòng khám TREOW</strong>. Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ sớm nhất để xác nhận.</p>
            
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #166534; margin-top: 0; font-size: 18px;">Thông tin đặt hẹn:</h3>
                <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                    <li><strong>Dịch vụ:</strong> ${booking.service}</li>
                    <li><strong>Thời gian dự kiến:</strong> ${booking.time} - ${new Date(booking.date).toLocaleDateString('vi-VN')}</li>
                </ul>
            </div>

            <p>Vui lòng đến trước giờ hẹn 10-15 phút để làm thủ tục check-in.</p>
            <p>Nếu cần hỗ trợ gấp hoặc thay đổi lịch, vui lòng liên hệ hotline: <strong>+447882843513</strong>.</p>
            
            <p style="margin-top: 30px;">Trân trọng,<br/>Đội ngũ TREOW</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>© 2024 Phòng khám Vật lý trị liệu TREOW.</p>
        </div>
    </div>
    `;
};
