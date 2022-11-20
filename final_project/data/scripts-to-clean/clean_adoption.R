library(tidyverse)
options(scipen = 9999)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"
raw_adoption <- read_csv(file.path(path, "/data/technology-adoption-by-households-in-the-united-states.csv"))
raw_adoption <- head(raw_adoption, -2) # remove last two rows

# codebook
technologies <- tibble(
  name = c('Cellular phone', 'Colour TV', 'Computer', 'Landline', 'Radio', 'Smartphone usage', 'Tablet'),
  intro = c(1973, 1954, 1977, 1876, 1923, 2007, 2010))

# clean
df <- raw_adoption %>%
  filter(item %in% technologies$name) %>%
  rename('technology' = item) %>%
  mutate(share = as.integer(share), # remove decimals
         technology = recode(technology, 'Cellular phone' = 'Cell phone', # rename values
                                         'Colour TV' = 'Color TV',
                                         'Smartphone usage' = 'Smartphone')) %>% 
  select(technology, year, share)

# write csv
write_csv(df, 'multiline-chart/adoption.csv')
