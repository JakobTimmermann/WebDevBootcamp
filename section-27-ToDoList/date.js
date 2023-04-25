// associating two functions associated with 
export function getDate () {
    const today = new Date();
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    return today.toLocaleDateString('de-DE', options);
}

export function getDay () {
    const today = new Date();
    const options = {
        weekday: 'long',
    };
    return today.toLocaleDateString('de-DE', options);
}