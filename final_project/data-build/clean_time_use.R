# https://www.kaggle.com/datasets/bls/american-time-use-survey?resource=download

library(tidyverse)
options(scipen = 9999)

path <- "/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project"

raw_atus_act <- read_csv(file.path(path, "/data-raw/atusact.csv"))

activities <- tibble(
  name = c("TV and movies", "TV (religious)", "Listening to radio", 
            "Listening to music", "Playing games", "Computer use (for leisure)", 
            "Telephone with family", "Telephone with friends"),
  code = c("120303", "120304", "120305", "120306", "120307", "120308", "160101", "160102")
)
  
# clean act
df <- raw_atus_act %>%
  select(tucaseid, tuactivity_n, trcodep, tuactdur24) %>%
  rename("respondent" = tucaseid,
         "actv_num" = tuactivity_n,
         "actv_code" = trcodep,
         "minutes" = tuactdur24)

# filter activities
df <- df %>%
  filter(actv_code %in% activities$code)

# combine times for multiple instances of single activity
df <- df %>%
  group_by(respondent, actv_code) %>%
  summarise(minutes = sum(minutes)) %>%
  pivot_wider(names_from = actv_code, values_from = minutes)

# separate respondent col into years
df <- df %>%
  separate(respondent, into = c("year", "respondent"), sep = 4)

df$x <- df$'120303'

df %>%
  group_by(year) %>%
  summarise(mean = mean(x, na.rm = TRUE))
df %>%
  group_by(year) %>%
  summarise('120303' = mean([2], na.rm = TRUE),
            '120304' = mean([3], na.rm = TRUE),
            '120305' = mean('120305', na.rm = TRUE),
            '120306' = mean('120306', na.rm = TRUE),
            '120307' = mean('120307', na.rm = TRUE),
            '120308' = mean('120308', na.rm = TRUE),
            '160101' = mean('160101', na.rm = TRUE),
            '160102' = mean('160102', na.rm = TRUE)) %>%
  pivot_longer(c('120303', '120304', '120305', '120306', '120307', '120308', '160101', '160102'), 
               names_to = "activity", values_to = "avg_min")
?mean()


# replace column names
replace_colnames <- activities$code %in% names(df)
df <- df %>%
  select("120303", "120304", "120305", "120306", "120307", "120308", "160101", "160102") %>%
  top_n(8) %>%
  rename_with(~activities$name[replace_colnames], activities$code[replace_colnames])
# source: https://stackoverflow.com/questions/73390056/how-do-i-rename-columns-in-tidyverse-with-vectors-of-names



