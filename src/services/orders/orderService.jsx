const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const uploadOrderImage = async (file, orderId) => {
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
                Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر
            },
        });

        // بررسی وضعیت رد سفارش
        if (!response.ok) {
            const errorMessage = await response.text(); // دریافت متن خطا
            throw new Error(`Failed to reject order: ${errorMessage}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error in rejectOrder:', error);
        return { success: false, message: error.message };
    }
};
const acceptOrder = async (orderId, ownerId) => {
    try {
        console.log(orderId,ownerId);
        const response = await fetch(`${API_URL}/orders/${orderId}/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر
            },
            body: JSON.stringify({ ownerId }),
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

export { uploadOrderImage, rejectOrder,acceptOrder };
