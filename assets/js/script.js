var defaultAmounts = ['', '25', '75'];
var totalBeckers = 5007;
var pledgeAmount = 89914;
var pledgeAmountLimit = 100000;
var pledgeCountList = [0, 101, 64];

function mobileMenu(flag) {
    if (flag) {
        document.getElementById('icon-hamburger').style.display = 'none';
        document.getElementById('mobile-menu').style.display = 'block';
    }
    else {
        document.getElementById('mobile-menu').style.display = 'none';
        document.getElementById('icon-hamburger').style.display = 'block';
    } 
}

function bookmarked(flag) {
    if (flag) {
        document.getElementById('bookmarked').style.display = 'none';
        document.getElementById('bookmark').style.display = 'inline-block';
    }
    else {
        document.getElementById('bookmark').style.display = 'none';
        document.getElementById('bookmarked').style.display = 'inline-block';
    }
}

function modal() {
    document.getElementById('mobile-menu').style.display = 'none';
    document.querySelector('.message-box').style.display = 'none';

    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('active');
    }

    const modalEl = document.querySelector('.modal');
    modalEl.style.display = 'block';

    const sectionEl = document.querySelector('.section');
    sectionEl.style.overflowY = 'hidden';
    sectionEl.style.height = modalEl.clientHeight + 'px';
}

function closeModal() {
    const sectionEl = document.querySelector('.section');
    sectionEl.style.overflowY = 'auto';
    sectionEl.style.height = 'auto';

    document.querySelector('.modal').style.display = 'none';
}

function previewPledge(el) {
    if (el.classList.contains('unavailable')) {
        return;
    }

    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('active');
    }

    el.classList.add('active');

    const modalEl = document.querySelector('.modal');
    modalEl.style.display = 'block';
    
    const sectionEl = document.querySelector('.section');
    sectionEl.style.overflowY = 'hidden';
    sectionEl.style.height = modalEl.clientHeight + 'px';
}

function submitPledge(index) {
    const inputEl = document.getElementById('pledge-amount-' + index);
    if (inputEl.value === '') {
        return;
    }

    pledgeAmount += parseInt(inputEl.value);
    inputEl.value = defaultAmounts[index];
    document.getElementById('pledge-amount').innerHTML = '$' + formatValue(pledgeAmount);

    totalBeckers++;
    document.getElementById('total-backers').innerHTML = formatValue(totalBeckers);

    if (index > 0) {
        pledgeCountList[index]--;
        document.getElementById('modal-count-number-' + index).innerHTML = pledgeCountList[index];
        document.getElementById('count-number-' + index).innerHTML = pledgeCountList[index];

        if (pledgeCountList[index] === 0) {
            document.getElementById('card-' + index).classList.add('unavailable');
            document.getElementById('modal-card-' + index).classList.add('unavailable');
        }
    }

    updateProgressBar();

    document.getElementById('modal-content').style.display = 'none';
    document.getElementById('message-box').style.display = 'block';

    const modalEl = document.querySelector('.modal');
    modalEl.style.display = 'block';

    const sectionEl = document.querySelector('.section');
    sectionEl.style.overflowY = 'hidden';
    sectionEl.style.height = modalEl.clientHeight + 'px';
}

function removeMessage() {
    const bodyEl = document.querySelector('body');
    bodyEl.style.overflowY = 'auto';
    bodyEl.style.height = 'auto'

    const sectionEl = document.querySelector('.section');
    sectionEl.style.height = 'auto';

    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.modal-content').style.display = 'block';
}

function formatValue(value) {
    let displayValue = '';
    let counter = 0;
    const strValue = value.toString();

    for (let i = strValue.length - 1; i >= 0; i--) {
        if (counter === 3) {
            displayValue = strValue[i] + ',' + displayValue;
            counter = 1;
        }
        else {
            displayValue = strValue[i] + displayValue;
            counter++;
        }
    }

    return displayValue;
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressBarInner = document.querySelector('.progress-bar-inner');

    if (pledgeAmount >= pledgeAmountLimit) {
        progressBarInner.style.width = progressBar.clientWidth + 'px';
        return;
    }

    progressBarInner.style.width = (pledgeAmount / pledgeAmountLimit * progressBar.clientWidth) + 'px';
}
