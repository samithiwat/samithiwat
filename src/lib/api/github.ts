import type { Repository } from '$lib/common/types/github-repo';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import moment from 'moment';

const client: AxiosInstance = Axios.create({
	baseURL: 'https://api.github.com',
	auth: {
		username: import.meta.env.VITE_GITHUB_USERNAME as string,
		password: import.meta.env.VITE_GITHUB_PASSWORD as string
	}
});

const getRepositories = async (): Promise<Repository[]> => {
	try {
		const response: AxiosResponse = await client.get('/users/samithiwat/repos');
		return response.data.map((repo: any) => ({
			name: repo.name,
			author: repo.owner.login,
			description: repo.description,
			url: repo.html_url,
			stars: repo.stargazers_count,
			updatedAt: moment(repo.updated_at).format('DD MMM YYYY'),
			time: moment(repo.updated_at).format('HH:mm A')
		}));
	} catch (error) {
		console.error(error);
		return error;
	}
};

export { getRepositories };
