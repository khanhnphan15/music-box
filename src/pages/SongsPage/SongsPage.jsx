import React, { useState } from "react";
import axios from "axios";
export default function PlaylistPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("audioFile", selectedFile);

        try {
            const response = await axios.post("/api/upload-audio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Handle the response from the server (e.g., show a success message)
            console.log("Upload successful:", response.data);
        } catch (error) {
            // Handle any errors that occurred during the upload process
            console.error("Upload error:", error);
        }

        // Reset the file input
        setSelectedFile(null);
    };

    return (
        <div>
            {/* Your playlist content goes here */}
            <form onSubmit={handleSubmit}>
                <input type="file" accept="audio/*" onChange={handleFileInput} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
