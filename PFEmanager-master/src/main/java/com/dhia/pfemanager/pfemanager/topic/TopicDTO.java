package com.dhia.pfemanager.pfemanager.topic;

import com.dhia.pfemanager.pfemanager.activity.topicActivity.ActivityDTO;
import com.dhia.pfemanager.pfemanager.user.intern.Intern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


public record TopicDTO(
        Integer id,
        String title,
        String description,
        String duration,
        boolean isAvailable,
        List<ActivityDTO> activities,
        String internName

) {

	public TopicDTO(Integer id, String title, String description, String duration, boolean isAvailable,
			List<ActivityDTO> activities, String internName) {
		this.id = id;	
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.isAvailable = isAvailable;

		this.activities = activities;
		this.internName= internName;
				
			
				
		// TODO Auto-generated constructor stub
	}
	
	
}
