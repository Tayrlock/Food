// 'use strict'
window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabConten(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabConten()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabConten(i)
                }
            })
        }
    })

    //Timer

    const deadLine = '2022-05-20'

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)
            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadLine)

    //Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')

    // add showTimer to Modal
    const modalTimerId = setTimeout(showModal, 500000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    function showModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        // modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    function closeModal() {
        modal.classList.remove('show')
        // modal.classList.toggle('show')
        document.body.style.overflow = ''
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', showModal)
    })



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    window.addEventListener('scroll', showModalByScroll)


    // confige Menu

    class Menu {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img
            this.alt = alt
            this.subtitle = subtitle
            this.descr = descr
            this.price = price
            this.img = img
            this.curse = '1.5'
            this.classes = classes
            this.parentSelector = document.querySelector('.menu .container')
            this.switchToUAH()
            this.render()
        }
        switchToUAH() {
            this.price = Math.floor(+this.price * +this.curse)
        }
        render() {
            const div = document.createElement('div')
            if (this.classes.length === 0) {
                this.div = 'menu__item'
                div.classList.add()
            }
            this.classes.forEach(className => div.classList.add(className))
            div.innerHTML = `
                                <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle} </h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    `

            this.parentSelector.append(div)
            //console.log(div)
        }
    }

    // const menuFitnes = 
    new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', '.menu .container', "menu__item", 'big')
    // .render()
    // menuPremium = 
    new Menu('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '550', '.menu .container', "menu__item")
    // .render()
    // menuPost = 
    new Menu('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '430', '.menu .container', "menu__item")
    // .render()


    // запросы к серверу
    // Forms

    const forms = document.querySelectorAll('form')
    const message = {
        loading: 'img/form/spinner.svg',
        sucsess: 'Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(item => {
        postData(item)
    })

    // XML запрос
    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault()
    //         const statusMessage = document.createElement('div')
    //         statusMessage.classList.add('status')
    //         statusMessage.textContent = message.loading
    //         form.append(statusMessage)

    //         const requset = new XMLHttpRequest()
    //         requset.open('POST', 'server.php')
    //         // requset.setRequestHeader('Content-type', 'multipart/form-data') заголовок не устанавливается при FormData
    //         const formData = new FormData(form)
    //         requset.send(formData)
    //         requset.addEventListener('load', () => {
    //             if (requset.status === 200) {
    //                 console.log(requset.response)
    //                 statusMessage.textContent = message.sucsess;
    //                 form.reset()
    //                 setTimeout(()=>{
    //                     statusMessage.remove()
    //                 }, 3000)
    //             } else {
    //                 statusMessage.textContent = message.failure;
    //             }
    //         })
    //     })
    // }

    // JSON запрос
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage)

            // const requset = new XMLHttpRequest()
            // requset.open('POST', 'server.php')
            // requset.setRequestHeader('Content-type', 'application/json')

            const formData = new FormData(form)
            // превращаем FormData в объект для JSON
            const obj = {}
            formData.forEach(function (value, key) {
                obj[key] = value
            })
            // requset.send(json)

            fetch('server.php', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(obj)
            }).then((data => data.text()))
                .then(data => {
                    console.log(data)
                    showThanksModal(message.sucsess)
                    statusMessage.remove()
                }).catch(() => {
                    showThanksModal(message.failure)
                }).finally(() => {
                    form.reset()
                })

            // requset.addEventListener('load', () => {
            //     if (requset.status === 200) {
            //         console.log(requset.response)
            //         showThanksModal(message.sucsess)
            //         form.reset()
            //         statusMessage.remove()
            //     } else {
            //         showThanksModal(message.failure)
            //     }
            // })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        showModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class = "modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal();
        }, 4000)
    }

    // Fetch API
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type':'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))
})
