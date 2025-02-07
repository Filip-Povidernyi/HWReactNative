const uploadImageToCloudinary = async (photoUri) => {
    const CLOUD_NAME = "dmlknrojl";
    const UPLOAD_PRESET = "postImageGoIT23072023";

    const formData = new FormData();
    formData.append("file", {
        uri: photoUri,
        type: "image/jpeg",
        name: "photo.jpg",
    });
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            return data.secure_url;
        } else {
            console.error("Error uploading image:", data);
            throw new Error(data.error.message);
        }
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};

export default uploadImageToCloudinary;