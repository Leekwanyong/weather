function getClock() {
    const data = new Date();
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');
    clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);
