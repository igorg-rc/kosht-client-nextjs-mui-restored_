import { useState, useEffect } from 'react'
import axios from 'axios'

export const InfiniteScroll = (pageNumber) => {
	useEffect(() => {
		axios({
			method: "GET",
			url: url,
			params: { page: pageNumber }
		}).then(res => {
			console.log(res.data)
		})
	}, [pageNumber])

	return null
}
