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

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.transfer = 27
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.changeToUAH()
        }
        changeToUAH() {
            this.price = Math.floor(+this.price * +this.transfer)
        }
        render() {
            const element = document.createElement('div')
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title} </h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
                    `

            this.parent.append(element)
            //console.log(div)
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return res.json()
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({ img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    //         })
    //     })

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

    // ?????????????? menuCard ?????? ????????????
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data))

    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div')
    //         element.classList.add('menu__item')
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title} </h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">????????:</div>
    //                     <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
    //                 </div>`

    //         document.querySelector('.menu .container').append(element)
    //     })
    // }


    // // const menuFitnes = 
    // new MenuCard("img/tabs/vegy.jpg", "vegy", '???????? "????????????"', '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!', '229', '.menu .container', "menu__item", 'big')
    // // .render()
    // // menuPremium = 
    // new MenuCard('img/tabs/elite.jpg', 'elite', '???????? ????????????????????', '?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!', '550', '.menu .container', "menu__item")
    // // .render()
    // // menuPost = 
    // new MenuCard('img/tabs/post.jpg', 'post', '???????? "??????????????"', '???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.', '430', '.menu .container', "menu__item")
    // // .render()


    // ?????????????? ?? ??????????????
    // Forms

    const forms = document.querySelectorAll('form')
    const message = {
        loading: 'img/form/spinner.svg',
        sucsess: '?????????? ???? ?? ???????? ????????????????',
        failure: '??????-???? ?????????? ???? ??????'
    }

    forms.forEach(item => {
        bindPostData(item)
    })

    // XML ????????????
    // function postData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault()
    //         const statusMessage = document.createElement('div')
    //         statusMessage.classList.add('status')
    //         statusMessage.textContent = message.loading
    //         form.append(statusMessage)

    //         const requset = new XMLHttpRequest()
    //         requset.open('POST', 'server.php')
    //         // requset.setRequestHeader('Content-type', 'multipart/form-data') ?????????????????? ???? ?????????????????????????????? ?????? FormData
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

    // JSON ????????????

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: data
        })

        return res.json()
    }


    function bindPostData(form) {
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
            // ???????????????????? FormData ?? ???????????? ?????? JSON
            // const obj = {}
            // formData.forEach(function (value, key) {
            //     obj[key] = value
            // })
            // requset.send(json)

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: { 'Content-type': 'application/json' },
            //     body: JSON.stringify(obj)
            // })

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
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

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res))

    // Sliders offer_slider

    // ???????????????? ?????? ????????????????
    // ???????????????? ?????????? ?? ???????????? ??????
    // ?????????????? ?????????????????? ??????????????????
    // ???????????????? ?????????? ???????????????????? ??????????????????

    const sliders = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        countCurrent = document.querySelector('#current'),
        countTotal = document.querySelector('#total'),
        btnNextSlider = document.querySelector('.offer__slider-next'),
        btnPrevSlider = document.querySelector('.offer__slider-prev'),
        slidersWrapper = document.querySelector('.offer__slider-wrapper'),
        slidersField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidersWrapper).width,
        indicators = document.createElement('ol'),
        dots = []
    let offset = 0,
        sliderIndex = 1

    function dotsShow() {
        dots.forEach(dot => dot.style.opacity = '0.5')
        dots[sliderIndex - 1].style.opacity = 1
    }

    function count(){
        if (sliders.length < 10) {
            countTotal.textContent = `0${sliders.length}`
            countCurrent.textContent = `0${sliderIndex}`
        } else {
            countTotal.textContent = sliders.length
            countCurrent.textContent = sliderIndex
        }
    }
    count()    

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '')
    }

    slidersField.style.width = 100 * sliders.length + '%'
    slidersField.style.display = 'flex'
    slidersField.style.transition = '0.5s all'

    slidersWrapper.style.overflow = 'hidden'

    sliders.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    indicators.classList.add('carousel-indicators')
    slider.append(indicators)

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li')
        dot.classList.add('dot')
        dot.setAttribute('data-slide-to', i + 1)
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot);
    }

    btnNextSlider.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (sliders.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }
        slidersField.style.transform = `translateX(-${offset}px)`

        if (sliderIndex == sliders.length) {
            sliderIndex = 1
        } else {
            sliderIndex++
        }
        count()
        dotsShow()
    })

    btnPrevSlider.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (sliders.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }
        slidersField.style.transform = `translateX(-${offset}px)`

        if (sliderIndex == 1) {
            sliderIndex = sliders.length
        } else {
            sliderIndex--
        }
        count()
        dotsShow()
    })

    dots.forEach(dot => {
        dot.addEventListener(('click'), (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            sliderIndex = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1)
            slidersField.style.transform = `translateX(-${offset}px)`

            count()
            dotsShow()
        })
    })

    // Sliders change
    // let count = 0

    // function showSlider(i) {
    //     sliders.forEach(slider => {
    //         slider.classList.add('hide', 'fade')
    //     })
    //     sliders[i].classList.toggle('hide')
    //     // console.log(sliders)
    //     countChange()
    // }

    // btnNextSlider.addEventListener('click', showNextSlider)
    // function showNextSlider() {
    //     (count == sliders.length - 1) ? count = 0 : count += 1
    //     showSlider(count)
    //     // console.log(count)
    // }

    // btnPrevSlider.addEventListener('click', showPrevSlider)
    // function showPrevSlider() {
    //     (count == 0) ? count = sliders.length - 1 : count -= 1
    //     showSlider(count)
    //     // console.log(count)
    // }

    // function countChange() {
    //     (sliders.length < 10)
    //         ? countTotal.textContent = `0${sliders.length}`
    //         : countTotal.textContent = sliders.length;
    //     (count + 1 < 10)
    //         ? countCurrent.textContent = `0${count + 1}`
    //         : countCurrent.textContent = (count + 1)
    // }
    // showSlider(count)
})
