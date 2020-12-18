import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Service from '../services/ProjectService';
import ProjectPrototyoe from '../models/ProjectPrototype';

// import { Container } from './styles';
export default function Projects() {
  const navigation = useNavigation();
  const projetcService = new Service;
  
  const [projects, setProject] = useState<ProjectPrototyoe[]>([]);
  const [busca, setBusca] = useState('');
  const [projectList, setProjectList] = useState<ProjectPrototyoe[]>([])

  useEffect(() => {
    projetcService.get().then((response) => {
      setProject(response.data);
      if(projectList.length===0){
        setProjectList(projects)
      };
    });
  });


  function handleFilterProjects(title: string){
    setBusca(title);
    let projetos = projectList;
    projetos = projetos.filter(project => project.title.includes(title));
    console.log(busca);
    title===''? setProjectList(projects):setProjectList(projetos)
  }

  function handleGoToProjectDetails(id: string) {
    navigation.navigate("ProjectDetails", {id});
  }
  function handleGoToCreateProject(){
    navigation.navigate("CreateProject");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
        <Feather name='search' size={ 30 } color='#7d5aa3'/>
        <TextInput 
          style={styles.inputText} 
          onChangeText={(search)=>{handleFilterProjects(search)}} 
          value={busca}/>
        </View>
          {projectList.map((project)=>(
            <View key={project.id}>
              <View style={styles.projectsContainer}>
            <View style={styles.projectTitleContainer}>
              <FontAwesome
                style={styles.iconColorBackground}
                name="file-code-o"
                size={24}
                color="#fff"
              />
              <Text style={styles.projectTitle}> { project.title } </Text>
            </View>
            <RectButton
              onPress={()=>handleGoToProjectDetails(project.id)}
              style={styles.viewInfoButton}
            >
              <FontAwesome
                style={styles.iconInfoButton}
                name="info"
                size={24}
                color="#7d5aa3"
              />
              <Text style={styles.textInfoButton}>Info</Text>
            </RectButton>
          </View>
          <View style={styles.separate} />
            </View>
          ))}
      </ScrollView>
      <RectButton onPress={handleGoToCreateProject} style={styles.addButton}>
        <Feather
          name="plus-circle"
          size={60}
          color="#7d5aa3"
        />
      </RectButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  projectsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewInfoButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },
  separate: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#bababa",
  },
  iconInfoButton: {
    paddingLeft: 17,
    paddingRight: 9,
    paddingTop: 8,
    paddingBottom: 2,
    borderRadius: 50,
    borderColor: "#7d5aa3",
    borderWidth: 4,
  },
  textInfoButton: {
    textAlign: "center",
    color: "#7d5aa3",
    fontFamily: "Nunito_600SemiBold",
  },
  projectTitle: {
    fontSize: 20,
    color: "#696969",
    fontFamily: "Nunito_600SemiBold",
    marginLeft: 20,
  },
  iconColorBackground: {
    backgroundColor: "#7d5aa3",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 30,
  },
  projectTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  addButton: {
    position: "absolute",
    left: 20,
    bottom: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  inputText: {
    backgroundColor: "#fff",
    height: 40,
    fontSize: 20,
    textAlignVertical: "bottom",
    paddingHorizontal: 5,
    paddingBottom: 5,
    fontFamily: "Nunito_600SemiBold",
    color: "#696969",
    width: '80%',
    marginLeft: 10
  },
  searchContainer:{
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
    borderLeftWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: "#696969",
    paddingLeft: 5,
  },
});
