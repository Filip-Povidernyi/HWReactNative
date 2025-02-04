const bcrypt = require('bcryptjs');


export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password: ", hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password: ", err);
    }
};

export const checkPassword = async (enteredPassword, storedHashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Error checking password: ", err);
    }
};


