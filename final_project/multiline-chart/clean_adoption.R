library(tidyverse)
options(scipen = 9999)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")

path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"

raw_adoption <- read_csv(file.path(path, "/data/technology-adoption-by-households-in-the-united-states.csv"))
raw_adoption <- head(raw_adoption, -2) # remove last two rows

# codebook
technologies <- tibble(
  name_og = c('Cable TV', 'Cellular phone', 'Colour TV', 'Computer', 'Ebook reader', 
              'Households with only mobile phones (no landlines)', 'Internet', 
              'Landline', 'Podcasting', 'Radio', 'Social media usage', 'Tablet', 
              'Television', 'Videocasette recorder'),
  name_new = c('Cable TV', 'Cell phone', 'Color TV', 'Computer', 'Ebook reader', 
               'Cell phone only (no landline)', 'Internet', 'Landline', 'Podcasting', 
               'Radio', 'Social media', 'Tablet', 'TV', 'Videocasette recorder'),
)

# clean
df <- raw_adoption %>%
  filter(item %in% technologies$name_og) %>%
  rename('technology' = item) %>%
  mutate(share = as.integer(share)) %>% # remove decimals
  select(technology, year, share)


# replace column names



# write csv
write_csv(df, 'multiline-chart/adoption.csv')
