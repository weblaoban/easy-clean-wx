<template>
    <div class="menu">
        <ul>
            <li>
                <router-link to="/">
                    <div class="img">
                        <img src="data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2214px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2014%2014%22%20style%3D%22enable-background%3Anew%200%200%2014%2014%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M3%2C0H1C0.447%2C0%2C0%2C0.447%2C0%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C4%2C0.447%2C3.553%2C0%2C3%2C0z%20M8%2C0H6%20C5.447%2C0%2C5%2C0.447%2C5%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C9%2C0.447%2C8.553%2C0%2C8%2C0z%20M13%2C0h-2c-0.553%2C0-1%2C0.447-1%2C1v2%20c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C14%2C0.447%2C13.553%2C0%2C13%2C0z%20M3%2C5H1C0.447%2C5%2C0%2C5.447%2C0%2C6v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2%20c0.553%2C0%2C1-0.447%2C1-1V6C4%2C5.447%2C3.553%2C5%2C3%2C5z%20M8%2C5H6C5.447%2C5%2C5%2C5.447%2C5%2C6v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V6%20C9%2C5.447%2C8.553%2C5%2C8%2C5z%20M13%2C5h-2c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V6C14%2C5.447%2C13.553%2C5%2C13%2C5z%20M3%2C10%20H1c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1v-2C4%2C10.447%2C3.553%2C10%2C3%2C10z%20M8%2C10H6c-0.553%2C0-1%2C0.447-1%2C1v2%20c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1v-2C9%2C10.447%2C8.553%2C10%2C8%2C10z%20M13%2C10h-2c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2%20c0.553%2C0%2C1-0.447%2C1-1v-2C14%2C10.447%2C13.553%2C10%2C13%2C10z%22%2F%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="">
                    </div>
                    申请任务
                </router-link>
            </li>
            <li>
                <router-link to="/myTask">
                    <div class="img">
                        <img src="../assets/images/shopping-cart-16.svg" alt="">
                    </div>
                    我的任务
                </router-link>
            </li>
            <li>
                <router-link to="/extension">
                    <div class="img">
                        <img src="../assets/images/upload-16.svg" alt="">
                    </div>
                    推广试用
                </router-link>
            </li>
            <li>
                <router-link to="/userInfo">
                    <div class="img">
                        <img src="../assets/images/user-16.svg" alt="">
                    </div>
                    个人中心
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'Menu'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #4685f4;
    }
    .menu{
        width: 100%;
        height: 80px;
        position: fixed;
        bottom: 0;
        left:0;
        background: #fff;
        z-index: 999;
        ul{
            display: flex;
            width: 100%;
            height: 100%;
            border-top: 1px solid #eee;
            border-radius: 2px;
            li{
                width: 25%;
                flex: 1;
                margin: 0;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    font-size: 26px;
                    .img{
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                        background: #4685f4;
                        padding-top: 4px;
                        margin: 6px auto 4px;
                        img{
                            width: 18px;
                            height: 18px;
                            display: block;
                            margin: 0 auto 0;
                        }
                    }
                }
            }
        }
    }
</style>
