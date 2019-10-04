<template>
    <div id="index">
        <section class="blog-posts">
            <div class="item" v-for="blog in blogs">
                <figure class="avatar">
                    <router-link :to='`/detail/${blog.id}`'>
                        <img :src="blog.user.avatar" :alt="blog.user.username">
                    </router-link>
                    <figcaption>{{blog.user.username}}</figcaption>
                </figure>
                <h3>
                    <router-link :to='`/detail/${blog.id}`'>{{blog.title}}</router-link>
                    <span> {{blog.createdAt | formatDate}}</span></h3>
                <p>
                    <router-link :to='`/detail/${blog.id}`'>{{blog.description}}</router-link>
                </p>
            </div>
        </section>
        <section class="pagination">
            <el-pagination
                background
                layout='prev, pager, next, jumper'
                :total="total"
                :current-page="page"
                :pager-count="5"
                @current-change='ChangePage'>
            </el-pagination>
        </section>
    </div>
</template>

<script>
    import blog from '@/api/blog'

    export default {
        name: 'Index',
        data() {
            return {
                blogs: [],
                total: 0,
                page: 1
            }
        },
        created() {
            this.page = parseInt(this.$route.query.page) || 1
            blog.getIndexBlogs({page: this.page}).then(res => {
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
            })
        },
        methods: {
            ChangePage(newVal) {
                blog.getIndexBlogs({page: newVal}).then(res => {
                    this.blogs = res.data
                    console.log(this.blogs)
                    this.total = res.total
                    this.page = res.page
                    this.$router.push({path: '/', query: {page: newVal}})
                })
            }
        }
    }
</script>

<style scoped lang='less'>
    @import "../../assets/base.less";

    #index {
        .pagination {
            display: grid;
            justify-items: center;
            margin-bottom: 30px;
        }
        .item {
            display: grid;
            // 这个 item 有两行，每一行的高度都是 auto；有两列，第一列的宽度是 80px ，第二列的宽度是容器剩余宽度
            grid: auto auto / 80px 1fr;
            margin: 20px 0;

            .avatar {
                // 宽度是 第一根线到第二根线
                grid-column: 1;
                // 高度是第一根线，然后横跨两根线，相当于 1 / 3
                grid-row: 1 / span 2;
                justify-self: center;
                margin-left: 0;
                text-align: center;

                img {
                    width: 60px;
                    height: 60px;
                    /*border-radius: 50%;*/
                }

                figcaption {
                    font-size: 12px;
                    color: @textLighterColor;
                }
            }

            h3 {
                grid-column: 2;
                grid-row: 1;

                & > span {
                    color: @textLighterColor;
                    font-size: 12px;
                    font-weight: normal;
                }
            }
            h3 a {
                text-decoration: none;
                color: #333;
            }

            p {
                grid-column: 2;
                grid-row: 2;
                margin-top: 0;
            }
            p a {
                text-decoration: none;
                color: #666;
            }
        }
    }

    @media (max-width: 768px) {
        #index {

            .item {
                margin: 10px 0;

                .avatar {
                    margin-left: 40px;
                }
            }
        }

        #index .item .avatar img {
            width: 40px;
            height: 40px;
        }

        h3 {
            padding-left: 20px;
        }

        p {
            margin-left: 20px;
        }

        .el-pagination {
            white-space: normal;
        }

    }
</style>
