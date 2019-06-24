export function toMMSS(eta: number) {
    if (eta > 3600) {
        return Math.floor(eta / 60 / 60) + ' hours ' + Math.floor(eta / 60 % 60) + ' minutes ' + (eta % 60) + ' seconds. (in current traffic)';
    } else {
        return Math.floor(eta / 60) + ' minutes ' + (eta % 60) + ' seconds. (in current traffic)';
    }
}

export function toKM(distance: number) {
    if (distance >= 1000) {
        return (distance / 1000).toFixed(2) + ' km';
    } else {
        return distance + ' m';
    }
}