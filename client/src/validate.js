const validate = (field) => {
    const errors = {}


    for (const key in field) {
        if (!field[key]) {
            errors[key] = "All fields are required!"
        }
    }

    if (field.name.length < 4) {
        errors.name = "Name must be at least 4 characters long"
    }

    if (field.description.length < 8) {
        errors.description = "Description must be at least 8 characteres long"
    }

    const releaseDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!releaseDateRegex.test(field.releaseDate)) {
        errors.releaseDate = "Release Date must be in the format YYYY-MM-DD"
    }

    const imageRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!imageRegex.test(field.image)) {
        errors.image = "Image must be a valid URL"
    }

    if (field.rating < 0 || field.rating > 5) {
        errors.rating = "Rating must be between 0 and 5"
    }

    if (field.genres.length > 6) {
        errors.genres = "You can select up to 6 genres"
    }

    if (field.platforms.length < 1) {
        errors.platforms = "Select at least 1 platform"
    }

    return errors;
}

export default validate