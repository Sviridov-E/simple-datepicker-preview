import DatepickerDom from "@segor/simple-datepicker-dom";
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/brands.scss";

const input: HTMLInputElement | undefined = document.querySelector("input#date");
const reactionMsg = document.querySelector("h3.reaction-msg");

const appState = {
    pickerIsOpen: false
}

input.addEventListener("click", () => {
    setTimeout(() => appState.pickerIsOpen = true, 0);
})

const datepicker = new DatepickerDom(input, {lang: 'en', closeWhenSelected: true, onOk: okCallback, onCancel: cancelCallback});

document.addEventListener("click", (e) => {
    const target: HTMLElement = e.target as HTMLElement;    
    if(!target.closest(".datepicker") && appState.pickerIsOpen) {
        datepicker.closeDatepicker();
        appState.pickerIsOpen = false;
    }
})

function okCallback(date: Date): void {
    const now = new Date();
    const birthdate = new Date();
    birthdate.setDate(date.getDate());
    birthdate.setMonth(date.getMonth());

    const diff: number = (Number(now) - Number(birthdate))/(24*60*60*1000);
    reactionMsg.innerHTML = generateMessage(diff);
    appState.pickerIsOpen = false;
}
function cancelCallback(): void {
    appState.pickerIsOpen = false;
}
function generateMessage(diff: number): string {
    const messages = [
        "Oh, I'm sory, I did not congrats you in time...",
        "Hmm, I'll try to remember and congrats you, but my memory so... Nevermind...",
        "Someone has a birthday soon. I'll congrats you!",
        "What a coincidence! Congratulations!!!"
    ];
    if(diff === 0) return messages[3];
    if(diff > 0 && diff <= 90) return messages[0];
    if(diff > 90 && diff <= 270) return messages[1];
    if(diff > 270) return messages[2];
    if(diff < 0 && diff >= -90) return messages[2];
    if(diff < -90 && diff >= -270) return messages[1];
    if(diff < -270) return messages[0];
    throw new Error('generateMessage func is dropped');
}