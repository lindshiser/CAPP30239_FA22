library(tidyverse)
options(scipen = 9999)
library(stringr)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"

raw_01 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2001.csv"))
raw_03 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2003.csv"))
raw_07 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2007.csv"))
raw_09 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2009.csv"))
raw_10 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2010.csv"))
raw_11 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2011.csv"))
raw_12 <- read_csv(file.path(path, "/data/census_internet/internet_usage_by_state_2012.csv"))


# clean 2001
df_01 <- raw_01 %>%
  slice(-1, -2, -3) %>%
  rename(state = names(.)[1],
         share = names(.)[7]) %>%
  mutate(year = 2001) %>%
  select(state, year, share)
df_01$state <- str_replace(df_01$state, ".", "") # remove period

# clean 2003
df_03 <- raw_03 %>%
  slice(-1, -2, -3, -4) %>%
  rename(state = names(.)[1],
         share = names(.)[7]) %>%
  mutate(year = 2003) %>%
  select(state, year, share)
df_03$state <- str_replace(df_03$state, ".", "") # remove period

# clean 2007
df_07 <- raw_07 %>%
  slice(-1, -2, -3, -4, -5, -6) %>%
  rename(state = names(.)[1],
         share = names(.)[6]) %>%
  mutate(year = 2007) %>%
  select(state, year, share)

# clean 2009
df_09 <- raw_09 %>%
  slice(-1, -2, -3, -4, -5, -6) %>%
  rename(state = names(.)[1],
         share = names(.)[6]) %>%
  mutate(year = 2009) %>%
  select(state, year, share)

# clean 2010
df_10 <- raw_10 %>%
  slice(-1, -2, -3) %>%
  rename(state = names(.)[1],
         share = names(.)[4]) %>%
  mutate(year = 2010) %>%
  select(state, year, share)

# clean 2011
df_11 <- raw_11 %>%
  slice(-1, -2, -3, -4, -5, -6, -7) %>%
  rename(state = names(.)[1],
         share = names(.)[6]) %>%
  mutate(year = 2011) %>%
  select(state, year, share)

# clean 2012
df_12 <- raw_12 %>%
  slice(-1, -2, -3, -4, -5) %>%
  rename(state = names(.)[1], 
         share = names(.)[4]) %>%
  mutate(year = 2012) %>%
  select(state, year, share)

df <- rbind(df_01, df_03, df_07, df_09, df_10, df_11, df_12)
df$share <- as.numeric(df$share)

write_csv(df, "choropleth-map/access.csv")
