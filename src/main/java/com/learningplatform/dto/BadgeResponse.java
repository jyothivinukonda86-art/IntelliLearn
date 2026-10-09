package com.learningplatform.dto;

public class BadgeResponse {

    private String id;
    private String name;
    private String description;
    private String iconName;
    private boolean unlocked;
    private String unlockedAt;
    private int progress;
    private int target;

    public BadgeResponse() {
    }

    public BadgeResponse(String id, String name, String description, String iconName,
                         boolean unlocked, String unlockedAt, int progress, int target) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconName = iconName;
        this.unlocked = unlocked;
        this.unlockedAt = unlockedAt;
        this.progress = progress;
        this.target = target;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }

    public String getUnlockedAt() {
        return unlockedAt;
    }

    public void setUnlockedAt(String unlockedAt) {
        this.unlockedAt = unlockedAt;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }
}
