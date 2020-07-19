
Vue.component('search-menu', {
    props: ['active'],
    template: `
        <div class="search-menu" :style="[(active) ? {'top': '0', 'margin': '0'} : {'top': '20%', 'margin': '0 1rem'}]">
            <div v-if="!active" class="row header">
                <div class="col-md-4 col-12 banner">
                    <img src="static/images/espere-banner.png">
                </div>
                <div class="col-md-8 col-12 description">
                    <h1>Find ways to help out people in need near you!</h1>
                    <h2>Try searching for a specific name or a type of charity.</h2>
                </div>
            </div>
            <form onsubmit="return false" :style="[(active) ? {'border-radius': 'unset'} : {'border-radius': '1rem'}]">
                <div class="row">
                    <div class="button-wrapper col-md-4 col-12 form-group" id="searchbar">
                        <input placeholder="Search..."></input>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="charity-type">
                        <select class="form-control">
                            <option disabled selected>Type</option>
                            <option>Food Bank</option>
                            <option>Youth Shelter</option>
                            <option>Womans Shelter</option>
                            <option>Mens Shelter</option>
                            <option>Clothing Donations</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="transport">
                        <select class="form-control">
                            <option disabled selected>Transportation</option>
                            <option>Walking</option>
                            <option>Biking</option>
                            <option>Car/Taxi</option>
                            <option>Bus</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-2 col-12" id="go-btn">
                        <button type="submit" class="btn" @click="emitActive()">Go</button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data() {
        return{
        }
    },
    methods: {
        emitActive(){
            this.$emit('active')
        }
    }
})

Vue.component('the-map', {
    props: ['active'],
    template: `
        <div class="map-wrapper">
            <div class="map-background">
                <img src="https://picsum.photos/1200/500">
            </div>
        </div>
    `
})

Vue.component('app', {
    template: `
        <div :class="[isActive ? 'app' : 'container app']">
            <search-menu @active="handleActive" :active="isActive"></search-menu>
            <the-map v-if="isActive"></the-map>
        </div>
    `,
    data() {
        return{
            isActive: false
        }
    },
    methods: {
        handleActive(){
            this.isActive = true
        }
    }
})

//Vue Instance
var app = new Vue({
    el: '#app'
})