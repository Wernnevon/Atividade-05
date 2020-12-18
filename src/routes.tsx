import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/header";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/createNeditProject/CreateProject";
import EditProject from "./pages/createNeditProject/EditProject";

// import { Container } from './styles';

const { Navigator, Screen } = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
        <Screen
          options={{
            headerShown: true,
            header: () => (
              <Header
                title="Projetos"
                showX={false}
                showArrow={false}
              />
            ),
          }}
          name="Projects"
          component={Projects}
        />
        <Screen
          options={{
            headerShown: true,
            header: () => (<Header title="Projeto"/>),
          }}
          name="ProjectDetails"
          component={ProjectDetails}
        />
        <Screen
          options={{
            headerShown: true,
            header: () => (<Header title="Adiconar Projeto"/>),
          }}
          name="CreateProject"
          component={CreateProject}
        />
        <Screen
          options={{
            headerShown: true,
            header: () => (<Header title="Editar Projeto"/>),
          }}
          name="EditProject"
          component={EditProject}
        />
      </Navigator>
    </NavigationContainer>
  );
}
