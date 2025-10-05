export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const StringRegex = /^[A-Za-z ]+$/;
export const CompanyStringRegex = /^[A-Za-z\s@.'\-_,&()!?]+$/;



export function StringValidation(value) {
    if (value === undefined || value === null || value === "" || value?.length === 0) {
        return { status: false, message: "is required" };
    } else if (!isNaN(value)) {
        return { status: false, message: "is invalid" };
    }
    else if (typeof value !== "string") {
        return { status: false, message: "must be a string" };
    }
    else if (value.length < 3) {
        return { status: false, message: "must be maximum 3 letters" };
    }

    return !StringRegex.test(value)
        ? { status: false, message: "is only Alphabets" }
        : { status: true, message: "" };
}

export function NumberValidation(value) {
    if (value === undefined || value === null || value === "" || (typeof value === "string" && value.trim().length === 0)) {
        return { status: false, message: "is required" };
    }
    if (typeof value !== "number" && isNaN(Number(value))) {
        return { status: false, message: "must be a valid number" };
    }
    if (Number(value) < 0) {
        return { status: false, message: "must be positive" };
    }

    return { status: true, message: "" };
}

export function EmailValidation(value) {
    if (!value || value.trim().length === 0) {
        return { status: false, message: "is required" };
    } 
    if (!(EmailRegex instanceof RegExp) || !EmailRegex.test(value)) {
        return { status: false, message: "Invalid email format" };
      }
    return { status: true, message: "" };
}

export function NonEmptyValidation(value) {
    if (value === null || value === undefined || value === "") {
        return { status: false, message: "is required" };
    }
    return { status: true, message: "" };
}

export function NonEmptyFaqArrayValidation(value) {
    if (!Array.isArray(value) || value.length === 0) {
        return { status: false, message: "FAQ list must not be empty" };
    }

    for (let i = 0; i < value.length; i++) {
        const faq = value[i];
        if (!faq.faq_question || faq.faq_question.trim() === "") {
            return { status: false, message: `FAQ ${i + 1}: Question is required` };
        }
        if (!faq.faq_answer || faq.faq_answer.trim() === "") {
            return { status: false, message: `FAQ ${i + 1}: Answer is required` };
        }
    }

    return { status: true, message: "" };
}


export function NonEmptyArrayValidation(value) {
    if (!Array.isArray(value) || value.length === 0) {
        return { status: false, message: "must not be empty" };
    }
    return { status: true, message: "" };
}

export function SlugValidation(value) {
    if (value === undefined || value === null || value === "" || value?.length === 0) {
        return { status: false, message: "is required" };
    } else if (typeof value !== "string") {
        return { status: false, message: "must be a string" };
    } else if (value.length < 3) {
        return { status: false, message: "must be at least 3 characters" };
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    return !slugRegex.test(value)
        ? { status: false, message: "must be lowercase, alphanumeric and hyphen-separated" }
        : { status: true, message: "" };
}


export function normalizeEmptyFields(obj) {
    const cleaned = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === "string" && value.trim() === "") {
            cleaned[key] = undefined;
        } else {
            cleaned[key] = value;
        }
    }
    return cleaned;
};


export function capitalizeWords(str) {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
