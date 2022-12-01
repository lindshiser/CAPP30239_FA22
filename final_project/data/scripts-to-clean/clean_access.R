library(tidyverse)
options(scipen = 9999)
library(stringr)
#install.packages("usmap")
library(usmap)
#install.packages('rjson')
library(rjson)
library(httr) # get API
library(jsonlite) # GET API


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

# merge with FIPS codes
fips <- df %>%
  group_by(state) %>%
  summarise(id = list(fips(state = first(state)))) %>%
  unnest(c(id))

df <- df %>%
  left_join(fips, by = "state") %>%
  select(id, state, year, share)

# create list
state_share <- df %>%
  select(state, id, share) %>%
  mutate(id = as.character(id))

list <- df %>%
  group_by(year) %>%
  summarise(state = list(state_share)) %>%
  deframe()

write_csv(df, "choropleth-map/data/access.csv")
write.csv(state_share, "choropleth-map/data/access_list.csv", row.names = FALSE)

####### for 2020
setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
res20 <- GET('api.census.gov/data/2020/acs/acs5/subject?get=NAME,group(S2802)&for=county:*&key=f7376443486af408306554a3976d5eca1a01f83e')
rawToChar(res20$content)
df20 <- as.data.frame(
  fromJSON(rawToChar(res20$content))
)
colnames(df20) <- df20[1, ] # replace header with first row of labels
df20 <- df20[-1, ] # remove redundant row of labels
df20 <- df20[ ,-3] # remove redundant name col

vars <- tibble(
  code = c('NAME', 'GEO_ID','S2802_C03_001E'),
  var = c('county', 'geo_id','share')
)

df20 <- df20 %>%
  select(any_of(vars$code)) %>%
  setNames(vars$var)

df20 <- df20 %>%
  separate(geo_id, into = c("REMOVE", "id"), sep = -5) %>%
  mutate(share = as.numeric(share)) %>%
  select(id, county, share)
  

write_csv(df20, "data/cleaned/access2020.csv")


### for 2017
res17 <- GET('api.census.gov/data/2017/acs/acs5/subject?get=NAME,group(S2802)&for=county:*&key=f7376443486af408306554a3976d5eca1a01f83e')
rawToChar(res17$content)
df17 <- as.data.frame(
  fromJSON(rawToChar(res17$content))
)
colnames(df17) <- df17[1, ] # replace header with first row of labels
df17 <- df17[-1, ] # remove redundant row of labels
df17 <- df17[ ,-3] # remove redundant name col

vars <- tibble(
  code = c('NAME', 'GEO_ID','S2802_C03_001E'),
  var = c('county', 'geo_id','share')
)

df17 <- df17 %>%
  select(any_of(vars$code)) %>%
  setNames(vars$var)

df17 <- df17 %>%
  separate(geo_id, into = c("REMOVE", "id"), sep = -5) %>%
  mutate(share = as.numeric(share)) %>%
  select(id, county, share)


write_csv(df17, "data/cleaned/access2017.csv")
