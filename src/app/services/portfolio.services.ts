import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projects: Project[] = [
    {
      id: 'focusride',
      title: 'FocusRide: AI-Driven Safety',
      image: 'assets/images/Project 5.png',
      description: 'FocusRide is an innovative AI-powered solution designed to combat distracted driving and optimize route planning in real time. By integrating computer vision and deep learning with dynamic routing algorithms, it ensures safer and more efficient road journeys.',
      githubUrl: 'https://github.com/shashwatsinghds/focusride',
      slides: [
        'assets/files/Projects/FocusRide/Slides/Slide1.png',
        'assets/files/Projects/FocusRide/Slides/Slide2.png',
        'assets/files/Projects/FocusRide/Slides/Slide3.png',
        'assets/files/Projects/FocusRide/Slides/Slide4.png',
        'assets/files/Projects/FocusRide/Slides/Slide5.png',
        'assets/files/Projects/FocusRide/Slides/Slide6.png',
        'assets/files/Projects/FocusRide/Slides/Slide7.png',
        'assets/files/Projects/FocusRide/Slides/Slide8.png',
        'assets/files/Projects/FocusRide/Slides/Slide9.png',
        'assets/files/Projects/FocusRide/Slides/Slide10.png',
        'assets/files/Projects/FocusRide/Slides/Slide11.png',
        'assets/files/Projects/FocusRide/Slides/Slide12.png',
        'assets/files/Projects/FocusRide/Slides/Slide13.png',
        'assets/files/Projects/FocusRide/Slides/Slide14.png',
        'assets/files/Projects/FocusRide/Slides/Slide15.png',
        'assets/files/Projects/FocusRide/Slides/Slide16.png'
      ],
      highlights: [
        'Developed a distraction detection system using ResNet50 and MobileNetV2, identifying subtle signs of drowsiness, phone use, and inattention',
        'Incorporated infrared sensors and high-res cameras for continuous driver monitoring',
        'Designed dynamic routing using Dijkstra\'s algorithm, adjusting paths based on the driver\'s distraction level and traffic',
        'Implemented a predicate logic-based intervention system to trigger alerts or reroute drivers when high-risk behavior is detected',
        'Built a modular, secure, and accessible architecture ensuring robust performance, privacy, and ease of use'
      ],
      impact: 'FocusRide pushes the frontier of AI in transportation by merging driver behavior analysis with proactive navigation. The system aims to reduce accident rates and congestion while prioritizing driver well-being.'
    },
    {
      id: 'fetal-health',
      title: 'Fetal Health Diagnostics',
      image: 'assets/images/Project 4.png',
      description: 'This project leverages machine learning to analyze cardiotocogram (CTG) data for predicting fetal health, contributing to global maternal-fetal care. It classifies conditions into normal, suspect, and pathological using real-time health signals.',
      githubUrl: 'https://github.com/shashwatsinghds/FetalHealthDiagnostics',
      slides: [
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide1.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide2.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide3.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide4.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide5.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide6.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide7.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide8.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide9.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide10.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide11.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide12.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide13.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide14.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide15.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide16.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide17.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide18.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide19.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide20.png',
        'assets/files/Projects/FetalHealthDiagnostics/Slides/Slide21.png'
      ],
      highlights: [
        'Utilized a dataset of 2,126+ CTG records to build supervised models for fetal health prediction',
        'Applied Random Forest, Gradient Boosting, and XGBoost, achieving up to 98% accuracy',
        'Tackled class imbalance using SMOTE, improving model generalization across underrepresented health categories',
        'Conducted statistical evaluation with ANOVA F-statistics to identify top predictive features like prolonged decelerations and abnormal short-term variability',
        'Validated findings through 5-fold cross-validation and precision-recall metrics, emphasizing public health safety'
      ],
      impact: 'By combining historical CTG data with cutting-edge AI models, this project offers a scalable, cost-effective approach to reduce preventable fetal distress. It underscores the role of machine learning in delivering accessible, proactive maternal healthcare.'
    },
    {
      id: 'medals-prediction',
      title: 'Medals Predictions Project',
      image: 'assets/images/Project 1.png',
      description: 'This project focuses on predicting the number of medals countries may win in sporting events based on historical and team-related data. Using Python and popular data science libraries like Pandas, Seaborn, and Scikit-learn, the project applies linear regression to uncover patterns and build predictive models.',
      githubUrl: 'https://github.com/shashwatsinghds/MedalsPrediction',
      slides: [
        'assets/images/Project1_Slide1.png',
        'assets/images/Project1_Slide2.png',
        'assets/images/Project1_Slide3.png'
      ],
      highlights: [
        'Pulled team data from an online CSV source',
        'Performed data exploration and visualization to identify trends',
        'Trained a regression model to predict medal outcomes',
        'Evaluated model accuracy using metrics like RMSE and R²'
      ],
      impact: 'This project demonstrates the application of machine learning in sports analytics, providing insights into athletic performance patterns and medal prediction capabilities.'
    },
    {
      id: 'brain-stroke',
      title: 'Brain Stroke Prediction',
      image: 'assets/images/Project 2.png',
      description: 'This project aims to predict the likelihood of a stroke using patient health records. It walks through an end-to-end data science pipeline—from data cleaning and exploratory analysis to model training and evaluation—to identify high-risk individuals effectively.',
      githubUrl: 'https://github.com/shashwatsinghds/BrainStrokeAnalysis',
      slides: [
        'assets/images/Project2_Slide1.png',
        'assets/images/Project2_Slide2.png',
        'assets/images/Project2_Slide3.png'
      ],
      highlights: [
        'Explored historical Australian weather data using pandas and visualized key features like humidity, temperature, and wind speed',
        'Preprocessed data by handling missing values and encoding categorical variables',
        'Trained a Logistic Regression model to predict if it will rain tomorrow',
        'Achieved 83.05% accuracy while also highlighting the impact of class imbalance in predictions'
      ],
      impact: 'This project showcases the power of machine learning in healthcare, providing a tool for early stroke risk assessment and prevention.'
    },
    {
      id: 'weather-analysis',
      title: 'Weather Analysis',
      image: 'assets/images/Project 3.png',
      description: 'This project analyzes weather data to predict whether it will rain tomorrow using a logistic regression model. It explores weather attributes such as temperature, humidity, wind speed, and rainfall history to train a binary classifier.',
      githubUrl: 'https://github.com/shashwatsinghds/AUS-WeatherAnalysis',
      slides: [
        'assets/images/Project3_Slide1.png',
        'assets/images/Project3_Slide2.png',
        'assets/images/Project3_Slide3.png'
      ],
      highlights: [
        'Utilized the weatherAUS.csv dataset with historical weather data from Australian cities',
        'Cleaned and preprocessed data by handling missing values and encoding categorical variables',
        'Trained a Logistic Regression model to predict if it will rain tomorrow',
        'Achieved 83.05% accuracy, noting the impact of class imbalance on prediction results'
      ],
      impact: 'This project demonstrates practical applications of machine learning in meteorology, providing accurate weather prediction capabilities for agricultural and planning purposes.'
    },
    {
      id: 'ai-medical-interviewing',
      title: 'AI in Medical Interviewing',
      image: 'assets/images/Project 6.png',
      description: 'This project explores the application of artificial intelligence in medical interviewing processes, focusing on improving patient-doctor interactions and diagnostic accuracy through AI-assisted questioning and analysis.',
      githubUrl: 'https://github.com/shashwatsinghds/ai-medical-interviewing',
      slides: [
        'assets/images/Project6_Slide1.png',
        'assets/images/Project6_Slide2.png',
        'assets/images/Project6_Slide3.png'
      ],
      highlights: [
        'Developed AI-powered interview systems for medical data collection',
        'Implemented natural language processing for patient response analysis',
        'Created intelligent questioning algorithms based on patient responses',
        'Integrated machine learning models for diagnostic assistance'
      ],
      impact: 'This project revolutionizes medical interviewing by leveraging AI to improve diagnostic accuracy, patient care quality, and healthcare efficiency.'
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
}