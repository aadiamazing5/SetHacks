Vue.component('search-menu', {
    template: `
        <div class="search-menu" :style="[(isActive) ? {'top': '0', 'margin': '0', 'border-radius': 'unset'} : {'top': '50%', 'margin': '0 1rem', 'border-radius': '1rem'}]">
            <form onsubmit="return false" method = "POST" action="{{url_for('index')}}">
                <div class="row">
                    <div class="button-wrapper col-md-4 col-12 form-group" id="searchbar">
                        <input placeholder="Search..." name="query"></input>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="charity-type">
                        <select class="form-control" name="type">
                            <option disabled selected>Type</option>
                            <option>Food Bank</option>
                            <option>Youth Shelter</option>
                            <option>Womans Shelter</option>
                            <option>Mens Shelter</option>
                            <option>Clothing Donations</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-3 col-6 form-group" id="transport">
                        <select class="form-control" name="transportation">
                            <option disabled selected>Transportation</option>
                            <option>Walking</option>
                            <option>Biking</option>
                            <option>Car/Taxi</option>
                            <option>Bus</option>
                        </select>
                    </div>
                    <div class="button-wrapper col-md-2 col-12" id="go-btn">
                        <button type="submit" class="btn" @click="isActive=true; emitActive()">Go</button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data() {
        return{
            isActive: false
        }
    },
    methods: {
        emitActive(){
            this.$emit('active')
        }
    }
})

Vue.component('app', {
    template: `
        <div :class="[isActive ? 'app' : 'container app']">
            <search-menu @active="handleActive"></search-menu>
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