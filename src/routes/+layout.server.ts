import type { LayoutServerLoad } from './$types';
import type { PortfolioData } from '$lib/types/types';
import portfolioData from '../content/data/portfolio-data.json';

export const load: LayoutServerLoad = async () => {
    const typedPortfolioData = portfolioData as PortfolioData;
    
    return {
        portfolioData: typedPortfolioData
    };
};