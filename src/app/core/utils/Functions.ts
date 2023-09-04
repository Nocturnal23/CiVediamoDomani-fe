export function buildDate(date: Date): string {
    if (!date) {
        return null;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();

    const realMonth = month < 10 ? '0' + month : month;
    const realday = day < 10 ? '0' + day : day;
    const realhour = hour < 10 ? '0' + hour : hour;
    const realmins = mins < 10 ? '0' + mins : mins;
    const realsecs = secs < 10 ? '0' + secs : secs;

    return `${year}-${realMonth}-${realday} ${realhour}:${realmins}:${realsecs}`;
}
