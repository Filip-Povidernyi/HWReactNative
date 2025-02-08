import bcrypt from "react-native-bcrypt";

// Налаштування рандомайзера для криптографічно безпечної генерації випадкових чисел
bcrypt.setRandomFallback((len) => {
    const array = new Uint8Array(len);
    return Array.from(crypto.getRandomValues(array));
});

// Асинхронне хешування пароля
export const hashPassword = async (password) => {
    try {
        // Генерація солі
        const salt = await bcrypt.genSaltSync(10);
        // Хешування пароля
        const hashedPassword = await bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Помилка під час хешування пароля:", error);
        throw error;
    }
};

// Асинхронна перевірка пароля
export const checkPassword = async (userPassword, storedHashPassword) => {
    try {
        // Порівняння введеного пароля з хешем
        const isMatch = await bcrypt.compareSync(userPassword, storedHashPassword);
        return isMatch;
    } catch (error) {
        console.error("Помилка під час перевірки пароля:", error);
        throw error;
    }
};
