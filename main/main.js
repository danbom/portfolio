new Vue({
    el: '#app',
    data: function(){
        return {
            options: {
                afterLoad: this.afterLoad,
                navigation: true,
                anchors: ['page1', 'page2', 'page3','page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10'],
                sectionsColor: ['#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec', '#e8e6ec']
            },
        }
    },
    methods: {
        afterLoad: function(origin, destination, direction){
            console.log("After load....");
            console.log(destination);

            const gotop = document.querySelector('.gotop');
            // console.log(window.location.hash);
            if (window.location.hash == '#page1'){
                gotop.style.opacity=0;
            }
            else {
                gotop.style.opacity=1;
            }       
        },
        addSection: function(e) {
            var newSectionNumber = document.querySelectorAll('.fp-section').length + 1

            // creating the section div
            var section = document.createElement('div')
            section.className = 'section'
            section.innerHTML = `<h3>Section ${newSectionNumber}</h3>`

            // adding section
            document.querySelector('#fullpage').appendChild(section)

            // creating the section menu element
            var sectionMenuItem = document.createElement('li')
            sectionMenuItem.setAttribute('data-menuanchor', 'page' + newSectionNumber)
            sectionMenuItem.innerHTML = `<a href="#page${newSectionNumber}">Section${newSectionNumber}</a>`

            // adding anchor for the section
            this.options.anchors.push(`page${newSectionNumber}`)

            // we have to call `update` manually as DOM changes won't fire updates
            // requires the use of the attribute ref="fullpage" on the
            // component element, in this case, <full-page>
            // ideally, use an ID element for that element too
            this.$refs.fullpage.build()
        },

        removeSection: function(){
            var sections = document.querySelector('#fullpage').querySelectorAll('.fp-section')
            var lastSection = sections[sections.length - 1]

            // removing the last section
            lastSection.parentNode.removeChild(lastSection)

            // removing the last anchor
            this.options.anchors.pop()

            // removing the last item on the sections menu
            var sectionsMenuItems = document.querySelectorAll('#menu li')
            var lastItem = sectionsMenuItems[sectionsMenuItems.length - 1]
            lastItem.parentNode.removeChild(lastItem)
        },
    }
});
