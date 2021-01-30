import React, { useEffect, useState } from 'react';

const Article = () => {
	const [data, setData] = useState(null);
	const apiUrl = 'http://proovitoo.twn.ee/api/article.json';
	const getData = () => fetch(`${apiUrl}`).then(res => res.json());

	useEffect(() => {
		getData().then(data => setData(data));
	}, []);

	if (data === null) {
		return <p>No data</p>;
	} else {
		const pattern = /<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>|<([A-Z][A-Z0-9]*).*?\/>/gi;
		let body = data.body.match(pattern);
		return (
			<article className='article'>
				<h1 className='mainTitle'>{data.title}</h1>
				<h2 className='introText'>{data.intro.replace(/<\/?[^>]+(>|$)/g, '')}</h2>
				<img src={data.images[0].medium} alt={data.images[0].alt} width='780px' />
				<div>
					{body.map((p, i) => (
						<p className='mainText' key={i}>
							{p.replace(/<\/?[^>]+(>|$)/g, '')}
						</p>
					))}
				</div>
				<div>
					{data.tags.map((tag, i) => (
						<p className='textTags' key={i}>
							{tag}
						</p>
					))}
				</div>
			</article>
		);
	}
};

export default Article;
