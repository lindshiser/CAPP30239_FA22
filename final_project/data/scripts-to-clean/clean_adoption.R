# US Household Penetration of Telecommunications: https://transportgeography.org/contents/chapter1/the-setting-of-global-transportation-systems/household-telecommunications-united-states/

library(tidyverse)
options(scipen = 9999)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
raw_adoption <- read_csv("data/sourced/technology-adoption-by-households-in-the-united-states.csv")
raw_adoption <- head(raw_adoption, -2) # remove last two rows

# codebook
technologies <- tibble(
  name = c('Cellular phone', 'Colour TV', 'Computer', 'Landline', 'Radio', 'Smartphone usage', 'Tablet'),
  technology = c('Cell phone', 'Color TV', 'Computer', 'Landline', 'Radio', 'Smartphone', 'Tablet'),
  origin = c(1983, 1954, 1977, 1876, 1923, 2007, 2010))
# cell phone: https://www.cengn.ca/information-centre/innovation/timeline-from-1g-to-5g-a-brief-history-on-cell-phones/
# color tv: https://www.britannica.com/technology/color-television
# computer: https://en.wikipedia.org/wiki/Home_computer
# radio: https://en.wikipedia.org/wiki/History_of_broadcasting
# smartphone: https://en.wikipedia.org/wiki/Smartphone
# tablet: https://www.onsightapp.com/blog/short-history-tablets

# clean
df <- raw_adoption %>%
  filter(item %in% technologies$name) %>%
  rename('technology' = item) %>%
  mutate(share = as.integer(share), # remove decimals
         technology = recode(technology, 'Cellular phone' = 'Cell phone', # rename values
                                         'Colour TV' = 'Color TV',
                                         'Smartphone usage' = 'Smartphone')) %>% 
  select(technology, year, share)

# create new df, calculate years since origin
years_passed <- df %>%
  left_join(technologies, by = 'technology') %>% # join with codebook to capture origin
  mutate(years = year - origin) %>% # calculate years passed since origin
  select(technology, years, share)

# code years
years_passed <- years_passed %>%
  mutate(coded = ifelse(years >= 4 & years <= 6, 5, NA),
         coded = ifelse(years >= 9 & years <= 11, 10, coded),
         coded = ifelse(years >= 14 & years <= 16, 15, coded),
         coded = ifelse(years >= 19 & years <= 21, 20, coded),
         coded = ifelse(years >= 24 & years <= 26, 25, coded)) %>%
  filter(coded != "NA")

# filter selected codes
years_passed <- years_passed %>%
  filter(technology == 'Cell phone' & (years == 11 | 
                                       years == 15 |
                                       years == 20 |
                                       years == 25) |
         technology == 'Color TV' &   (years == 15 |
                                       years == 20 |
                                       years == 25) |
         technology == 'Computer' &   (years == 15 |
                                       years == 21 |
                                       years == 26) |
         technology == 'Radio' &      (years == 5 |
                                       years == 10 |
                                       years == 15 |
                                       years == 20 |
                                       years == 25) |
         technology == 'Smartphone' & (years == 5 |
                                       years == 10)) %>%
  select(technology, coded, share) %>%
  rename(years = coded)

# write csv
#write_csv(df, 'data/cleaned/adoption.csv')
write_csv(years_passed, 'data/cleaned/adoption_origin.csv')
