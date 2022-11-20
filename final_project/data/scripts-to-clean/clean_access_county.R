library(tidyverse)
options(scipen = 9999)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"

access <- read_csv(file.path(path, "/data/form_477_county-level_data.csv"))
historical <- read_csv(file.path(path, "/data/historical_form_477_county-level_data.csv"))

access %>%
  rename()