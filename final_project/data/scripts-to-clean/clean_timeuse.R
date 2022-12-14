library(tidyverse)
options(scipen = 9999)

setwd("/Users/lindsayhiser/Documents/Harris/4_FA22/Data Visualization/CAPP30239_FA22/final_project")
atus0321 <- read_csv("data/sourced/atussum_0321.dat")

activities <- tibble(
  name = c("Watching TV/movies", "Listening to radio", 
            "Listening to music", "Using computer", 
            "Using phone (family)", "Using phone (friends)"),
  code = c("t120303", "t120305", "t120306", "t120308", "t160101", "t160102")
)

df <- atus0321 %>%
  select(TUCASEID, t120303, t120305, t120306, t120308, t160101, t160102)

df <- df %>%
  separate(TUCASEID, into = c("year", "respondent"), sep = 4)

# rename columns
df <- df %>%
  rename('tv' = 't120303',
         'radio' = 't120305',
         'music' = 't120306',
         'computer' = 't120308',
         'phone_family' = 't160101',
         'phone_friends' = 't160102')

# divide df to inclusive and exclusie
df_inc <- df
df_exc <- df

# calculate averages per activity, EXCLUSIVE of those who don't use
df_exc[df_exc == 0] <- NA # replace zeros with NAs
df_exc <- df_exc %>%
  group_by(year) %>%
  summarise('Watching TV/movies' = mean(tv, na.rm = TRUE),
            'Listening to radio' = mean(radio, na.rm = TRUE),
            'Listening to music' = mean(music, na.rm = TRUE),
            'Using computer' = mean(computer, na.rm = TRUE),
            'Using phone (family)' = mean(phone_family, na.rm = TRUE),
            'Using phone (friends)' = mean(phone_friends, na.rm = TRUE)) %>%
  pivot_longer(c('Watching TV/movies', 'Listening to radio', 'Listening to music', 'Using computer', 'Using phone (family)', 'Using phone (friends)'), 
               names_to = "activity", values_to = "minutes")
df_exc$minutes <- as.integer(df_exc$minutes)

# calculate averages per activity, INCLUSIVE of those who don't use
df_inc <- df_inc %>%
  group_by(year) %>%
  summarise('Watching TV/movies' = mean(tv, na.rm = TRUE),
            'Listening to radio' = mean(radio, na.rm = TRUE),
            'Listening to music' = mean(music, na.rm = TRUE),
            'Using computer' = mean(computer, na.rm = TRUE),
            'Using phone (family)' = mean(phone_family, na.rm = TRUE),
            'Using phone (friends)' = mean(phone_friends, na.rm = TRUE)) %>%
  pivot_longer(c('Watching TV/movies', 'Listening to radio', 'Listening to music', 'Using computer', 'Using phone (family)', 'Using phone (friends)'), 
               names_to = "activity", values_to = "minutes")
df_inc$minutes <- as.integer(df_inc$minutes)

write_csv(df_inc, "data/cleaned/timeuse_inclusv.csv")
write_csv(df_exc, "data/cleaned/timeuse_exclusv.csv")

