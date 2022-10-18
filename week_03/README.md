# About Data for Final Project

For my final project, I'll be visualizing the environmental impacts of food production. 

I was largely inspired by Hannah Ritchie and Max Roser's [work on the environmental impacts of food production](https://ourworldindata.org/environmental-impacts-of-food) for [Our World in Data](https://ourworldindata.org/). I've uploaded select data files from their work to my repo:

- **food-footprints.csv:** Primary source. Calculates greenhouse gas (ghg) emissions per kg for different food products. Data is from 2018.

- **food-emissions-supply-chain.csv:** Calculates greenhouse gas (ghg) emmissions for different food products at different stages in the supply chain, including land use, transport, and packaging. Data is from 2018.

- **food-emissions-life-cycle.csv:** Calculates total emissions for different food-related activities (e.g. consumption, transport, land use) per year. Data spans from 1990-2015. Data is collected per year for methane (CH4), carbon dioxide (CO2), and nitrogen dioxide (N20).

- **ghg-kcal-poore.csv:** Calculates ghg emissions per 100kcal for different food products. Data is from 2010.

- **ghg-per-protein-poore.csv:** Calculates ghg emissions per 100g of protein for different food products. Data is from 2010.

I'm interested in creating visualizations that educate readers about the carbon footprint of individual food products. I also hope to inspire readers to cosnider ways to lower their own carbon footprint with the respect to their diet. I hope to combine these data sets through key identifiers, like food product or year, to convey information about which foods are top emitters, as well as emissions trends over time.

I am concerned that some data was collected in 2010, while other data was collected in 2018. I'll keep this in mind during any data merges.

My primary data source will be from **food-footprints.csv**, which lists the total ghg emissions for different food products in 2018 I will use the supplementary sources outlined above to add nuance about emission sources for each food product along the supply chain.
