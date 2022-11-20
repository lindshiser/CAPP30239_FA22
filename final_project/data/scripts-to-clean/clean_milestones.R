library(tidyverse)
options(scipen = 9999)

path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"
adoption <- read_csv(file.path(path, "multiline-chart/adoption.csv"))

# add year of introduction
df <- adoption %>%
  mutate(intro = ifelse(technology == 'Radio', 1923, "")) %>%
  mutate(intro = ifelse(technology == 'Cell phone', 1973, intro)) %>%
  mutate(intro = ifelse(technology == 'Computer', 1977, intro)) %>%
  mutate(intro = ifelse(technology == 'Color TV', 1954, intro)) %>%
  mutate(intro = ifelse(technology == 'Landline', 1876, intro)) %>%
  mutate(intro = ifelse(technology == 'Tablet', 2010, intro)) %>%
  mutate(intro = as.numeric(intro)) %>%
  mutate(since_intro = year - intro)
