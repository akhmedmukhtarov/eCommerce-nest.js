export function slugify(name: string): string {
    const slug = name.split("'").join('').split(' ').join('').split('/').join('').split('|').join('').toLowerCase()
    return slug;
}
