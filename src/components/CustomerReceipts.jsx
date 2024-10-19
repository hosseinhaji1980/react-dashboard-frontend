import React, { useState, useEffect } from "react";
import { Table, Spin, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons"; // Import Eye icon
import paymentReceiptsService from "../services/paymentReceipts"; // Import the default export
import moment from 'moment';

function CustomerReceipts() {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [currentImage, setCurrentImage] = useState(""); // State to store the current image URL

    useEffect(() => {
        // Fetch the data from the API
        const fetchData = async () => {
            try {
                const response = await paymentReceiptsService.getReceiptsData(); // Accessing getReceiptsData through the imported object
                setReceipts(response); // Assuming response.data already contains the receipts
                setLoading(false); // Stop loading
            } catch (error) {
                console.error("Error fetching receipts data:", error);
                setLoading(false); // Stop loading even on error
            }
        };

        fetchData();
    }, []);

    // Handle opening the modal
    const handleImageClick = (imageUrl) => {
        setCurrentImage(imageUrl); // Set the current image URL
        setIsModalVisible(true); // Show the modal
    };

    // Define table columns
    const columns = [
        {
            title: "Chat ID",
            dataIndex: "chatid",
            key: "chatid",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Family",
            dataIndex: "family",
            key: "family",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => (
                <EyeOutlined
                    onClick={() => handleImageClick(`http://localhost:5004/${text}`)} // Add URL prefix
                    style={{ cursor: "pointer", fontSize: 24, color: "#1890ff" }} // Style the icon
                />
            ), // Display eye icon
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"), // Format the date with moment
        },
    ];

    // Handle closing the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="row">
            <h2>Customer Receipts</h2>
            {loading ? (
                <Spin size="large" /> // Show loading while fetching data
            ) : (
                <Table
                    dataSource={receipts} // Table data
                    columns={columns} // Table columns
                    rowKey="chatid" // Unique key for each row
                />
            )}

            {/* Modal to display the image */}
            <Modal
                visible={isModalVisible}
                title="Receipt Image"
                footer={null}
                onCancel={handleCancel}
            >
                <img src={currentImage} alt="Receipt" style={{ width: "100%" }} /> {/* Display the current image */}
            </Modal>
        </div>
    );
}

export default CustomerReceipts;
