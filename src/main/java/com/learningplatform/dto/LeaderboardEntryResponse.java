package com.learningplatform.dto;

public class LeaderboardEntryResponse {

    private int rank;
    private String displayName;
    private int totalXp;
    private int level;
    private String levelName;
    private boolean isCurrentUser;

    public LeaderboardEntryResponse() {
    }

    public LeaderboardEntryResponse(int rank, String displayName, int totalXp, int level, String levelName, boolean isCurrentUser) {
        this.rank = rank;
        this.displayName = displayName;
        this.totalXp = totalXp;
        this.level = level;
        this.levelName = levelName;
        this.isCurrentUser = isCurrentUser;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getTotalXp() {
        return totalXp;
    }

    public void setTotalXp(int totalXp) {
        this.totalXp = totalXp;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public boolean isCurrentUser() {
        return isCurrentUser;
    }

    public void setCurrentUser(boolean currentUser) {
        isCurrentUser = currentUser;
    }
}
