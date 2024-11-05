app.component('nonprofit-list',{
    props:['option','search',],
    data() {
        return {
            nonprofits: [], // Array to hold nonprofit slugs from the search API
            detailedNonprofits: [], // Array to hold the detailed nonprofit data
            apiKey: 'pk_live_44a03c8416f486b398b9141760699b40', // Your API key
            searchUrl: 'https://partners.every.org/v0.2/search/', // Nonprofit Search API
            nonprofitUrl: 'https://partners.every.org/v0.2/nonprofit/', // Endpoint to fetch details
        };
    },
    mounted() {
        // Fetch the list of nonprofits when the component is mounted
        this.fetchNonprofits();
    },
    watch: {
        option(){
                this.fetchNonprofits();
            },
        },
    methods: {
        // Fetch a list of nonprofits with 50 results
        triggerSearch(){
            this.fetchsearchNonprofits()
        },
        async fetchsearchNonprofits() {
            try {
                const response = await axios.get(`https://partners.every.org/v0.2/search/${this.search}?apiKey=${this.apiKey}&take=50`);
                const data = response.data.nonprofits;
                this.nonprofits = data; // Store the nonprofit slugs
                this.fetchDetailedInfoForAll();
            } catch (error) {
                console.error('Error fetching nonprofit list:', error);
            }
        },
        async fetchNonprofits() {
            try {
                const response = await axios.get(`https://partners.every.org/v0.2/browse/${this.option}?apiKey=${this.apiKey}&take=50`);
                const data = response.data.nonprofits;
                this.nonprofits = data; // Store the nonprofit slugs
                this.fetchDetailedInfoForAll();
            } catch (error) {
                console.error('Error fetching nonprofit list:', error);
            }
        },
        // Fetch detailed info for all nonprofits
        async fetchDetailedInfoForAll() {
            try {
                const detailedNonprofits = await Promise.all(
                    this.nonprofits.map(nonprofit => this.fetchNonprofitDetails(nonprofit.slug))
                );

                // Filter out any nonprofits without a cover image
                this.detailedNonprofits = detailedNonprofits.filter(
                    n => n !== undefined && n.coverImageUrl &&n.description
                );
            } catch (error) {
                console.error('Error fetching detailed info:', error);
            }
        },
        // Fetch detailed info for a single nonprofit using its slug
        async fetchNonprofitDetails(slug) {
            try {
                const response = await axios.get(`${this.nonprofitUrl}${slug}?apiKey=${this.apiKey}`);
                const data = response.data.data.nonprofit;
                return data; // Return detailed nonprofit data
            } catch (error) {
                console.error(`Error fetching details for ${slug}:`, error);
                return undefined;
            }
        },
        // Generate a donation link using the nonprofit slug
        donateLink(slug) {
            return `https://www.every.org/${slug}/donate`;
        }
    },
    template: `
    <div class="container">
        <div class="row g-4">
            <div class="col-md-4 col-lg-3 col-sm-12 mb-4" v-for="nonprofit in detailedNonprofits" :key="nonprofit.ein || nonprofit.slug">
                <div class="card h-100"> 
                    <img :src="nonprofit.coverImageUrl" 
                         class="card-img-top" 
                         :alt="nonprofit.name + ' cover image'" />
                    <div class="card-body"> 
                        <h5 class="card-title"> {{ nonprofit.name }}</h5>
                        <p class="card-text" v-if="nonprofit.locationAddress">
                            <strong>Location:</strong> {{ nonprofit.locationAddress }}
                        </p>
                        <p class="card-text description">
                        <strong>Description: </strong>{{ nonprofit.description || 'No description available' }}
                        </p>
                    </div>
                    <div class="card-footer text-center"> 
                        <!-- Donate button -->
                        <a :href="donateLink(nonprofit.primarySlug)" 
                           target="_blank" 
                           class="btn btn-primary">
                           Donate Now
                        </a>
                        <!-- Profile link -->
                        <p class="mt-2">
                            <a :href="nonprofit.websiteUrl" target="_blank" class="btn btn-primary">View Website</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`,
});
// Create and mount the Vue app
const vm = app.mount("#app");
