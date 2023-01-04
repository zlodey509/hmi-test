<template>
	<div>
		<vue-good-table
	      :columns="posts_columns"
	      :rows="posts"
	      :pagination-options="{
	        enabled: true,
	      }"
	      :line-numbers="true">

	      <template #table-row="props">
	          <span  v-if="props.column.field == 'body'">
	            <div style="white-space: pre-line" v-html="props.row.body"></div>
	          </span>
	        </template>
	    </vue-good-table>	

	    <div style="text-align: center; font-size: 36px; padding-top: 40px;">Post comments emails symbols count</div>

	    <BarChart style="margin-top: 20px;" :chartData="SymbolsCountData" :options="SymbolsCountChartOptions" />
	</div>
</template>

<script>
	import { BarChart } from 'vue-chart-3';
	import { Chart, registerables } from "chart.js";

	Chart.register(...registerables);

	export default{
		components: { 
		  BarChart,
		},
		data(){
			return{
				posts: [{}],
				comments: '',
				posts_columns: [
					{
						label: 'Title',
						field: 'title',
						filterOptions: {
						  enabled: true, // enable filter for this column
						  placeholder: 'Filtration', // placeholder for filter input
						  trigger: 'key-up', //only trigger on enter not on keyup
						},
					},
					{
						label: 'Description',
						field: 'body',
						html: true,
					},
					{
						label: 'Comments count',
						field: 'comments_count'
					},
				],
				posts_comment_email_symbols_count: [],
				SymbolsCountData: '',
				SymbolsCountChartOptions: {
					plugins: {
					    legend: {
					        display: false,
					    },
					},
				},
			}
		},
		mounted(){
			this.getPostsAndComments()
		},
		methods:{
			getPostsAndComments(){
				this.axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
					this.posts = response.data
					
					Promise.resolve(
						this.axios.get('https://jsonplaceholder.typicode.com/comments').then(result => {
							this.comments = result.data
						})
						).then(() => {
							this.posts.forEach(item => {
								const item_comments = this.comments.filter(comment => comment.postId == item.id)

								var comments_email_symbols_count = 0

								item_comments.forEach(comment => {
									const comment_email = comment.email
									comments_email_symbols_count += comment_email.length
								})
								
								item.comments_email_symbols_count = comments_email_symbols_count

								item.comments_count = item_comments.length
							})

							this.prepareSymbolsCountDataForChart()
						})
					
				})
			},
			prepareSymbolsCountDataForChart(){
				let ids_set = new Set()
				let ids = this.posts.map(a => a.id)
				ids.forEach(item => {
					ids_set.add(item)
				})
				let ids_arr = Array.from(ids_set)
				
				ids_set.forEach(item => {
					let posts_comment_email_symbols_count = 0
					
					this.posts.forEach(post => {
						if(post.id == item){
							posts_comment_email_symbols_count += post.comments_email_symbols_count
						}
					})

					this.posts_comment_email_symbols_count.push(posts_comment_email_symbols_count)

				})

				this.SymbolsCountData = {
				    labels: ids_arr,
				    datasets: [
				        {
				            data: this.posts_comment_email_symbols_count,
				            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
				        },

				    ],
				}
			}
		}
	}
</script>

