const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const uploadOrderImage = async (file, orderId,chatId,source) => {
    console.log(source);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('orderId', orderId);

    try {
        const uploadResponse = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر
            },
        });

        // ارسال پیام در صورت نیاز
        if (source === 'pgemshop') {
            alert(source);
            const imageurl='test';
            const text='text';
            const testResponse = await fetch(`https://customerapi.gembama.com/send-test-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId, imageurl, text}),
            });

            if (!testResponse.ok) {
                const errorMessage = await testResponse.text();
                throw new Error(`Failed to send test message: ${errorMessage}`);
            }
        }
        // بررسی وضعیت آپلود
        if (!uploadResponse.ok) {
            const errorMessage = await uploadResponse.text(); // دریافت متن خطا
            throw new Error(`Failed to upload image: ${errorMessage}`);
        }

        return { success: true };
        
    } catch (error) {
        console.error('Error in uploadOrderImage:', error);
        return { success: false, message: error.message };
    }
};

const rejectOrder = async (orderId) => {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/reject`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // بررسی وضعیت رد سفارش
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to reject order: ${errorMessage}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error in rejectOrder:', error);
        return { success: false, message: error.message };
    }
};

const acceptOrder = async (orderId, ownerId, source, chatId) => {
    try {
        console.log(source);
        const response = await fetch(`${API_URL}/orders/${orderId}/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId, ownerId }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to accept order: ${errorMessage}`);
        }

        const result = await response.json();
        console.log(result.message); // پیام موفقیت


    } catch (error) {
        console.error('Error accepting order:', error);
    }
};

export { uploadOrderImage, rejectOrder, acceptOrder };