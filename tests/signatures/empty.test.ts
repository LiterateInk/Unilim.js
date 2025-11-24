import { describe, expect, it } from "bun:test";
import { Signatures } from "src/iut/signatures";
import html from "./empty.html" with { type: "text" };

describe("iut/signatures [empty]", () => {
  const report = Signatures.parse(html as unknown as string);

  it("should parse the report card", () => {
    expect(report.fullName).toBe("JOHN DOE");
    expect(report.promotion).toBe("Année 3");
    expect(report.semesters).toBeArrayOfSize(2);
  });

  it("should parse the 5th semester metadata", () => {
    const semester = report.semesters[0];
    expect(semester.name).toBe("Semestre 5");
    expect(semester.units).toBeArrayOfSize(3);
  });

  it("should parse the 5th semester's 1st unit", () => {
    const unit = report.semesters[0].units[0];

    expect(unit.average).toBeNull();
    expect(unit.code).toBe("UE 5.1");
    expect(unit.name).toBe("Réaliser un développement d'application");
    expect(unit.coefficient).toBe(10);
    expect(unit.modules).toBeArrayOfSize(11);

    {
      const module = unit.modules[0];
      expect(module.code).toBe("R5.A.02");
      expect(module.name).toBe("Projet personnel et professionnel");
      expect(module.coefficient).toBe(0.1);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[1];
      expect(module.code).toBe("R5.A.04");
      expect(module.name).toBe("Qualité algorithmique");
      expect(module.coefficient).toBe(0.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[2];
      expect(module.code).toBe("R5.A.05");
      expect(module.name).toBe("Programmation avancée");
      expect(module.coefficient).toBe(0.9);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[3];
      expect(module.code).toBe("R5.A.06");
      expect(module.name).toBe("Sensibilisation à la programmation multimédia");
      expect(module.coefficient).toBe(0.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[4];
      expect(module.code).toBe("R5.A.07");
      expect(module.name).toBe("Automatisation de la chaîne de production");
      expect(module.coefficient).toBe(0.6);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[5];
      expect(module.code).toBe("R5.A.08");
      expect(module.name).toBe("Qualité de développement");
      expect(module.coefficient).toBe(0.7);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[6];
      expect(module.code).toBe("R5.A.09");
      expect(module.name).toBe("Virtualisation avancée");
      expect(module.coefficient).toBe(0.7);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[7];
      expect(module.code).toBe("R5.A.10");
      expect(module.name).toBe("Nouveaux paradigmes de base de données");
      expect(module.coefficient).toBe(1.1);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[8];
      expect(module.code).toBe("R5.A.13");
      expect(module.name).toBe("Économie durable et numérique");
      expect(module.coefficient).toBe(0.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[9];
      expect(module.code).toBe("R5.A.14");
      expect(module.name).toBe("Anglais");
      expect(module.coefficient).toBe(0.3);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[10];
      expect(module.code).toBe("S5.A.01");
      expect(module.name).toBe("Développement avancé");
      expect(module.coefficient).toBe(5.0);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }
  });

  it("should parse the 5th semester's 2nd unit", () => {
    const unit = report.semesters[0].units[1];

    expect(unit.average).toBeNull();
    expect(unit.code).toBe("UE 5.2");
    expect(unit.name).toBe("Optimiser des applications");
    expect(unit.coefficient).toBe(10);
    expect(unit.modules).toBeArrayOfSize(11);

    {
      const module = unit.modules[0];
      expect(module.code).toBe("R5.A.02");
      expect(module.name).toBe("Projet personnel et professionnel");
      expect(module.coefficient).toBe(0.1);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[1];
      expect(module.code).toBe("R5.A.04");
      expect(module.name).toBe("Qualité algorithmique");
      expect(module.coefficient).toBe(0.6);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[2];
      expect(module.code).toBe("R5.A.05");
      expect(module.name).toBe("Programmation avancée");
      expect(module.coefficient).toBe(0.7);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[3];
      expect(module.code).toBe("R5.A.06");
      expect(module.name).toBe("Sensibilisation à la programmation multimédia");
      expect(module.coefficient).toBe(0.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[4];
      expect(module.code).toBe("R5.A.08");
      expect(module.name).toBe("Qualité de développement");
      expect(module.coefficient).toBe(0.5);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[5];
      expect(module.code).toBe("R5.A.09");
      expect(module.name).toBe("Virtualisation avancée");
      expect(module.coefficient).toBe(0.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[6];
      expect(module.code).toBe("R5.A.10");
      expect(module.name).toBe("Nouveaux paradigmes de base de données");
      expect(module.coefficient).toBe(0.4);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[7];
      expect(module.code).toBe("R5.A.11");
      expect(module.name).toBe("Méthodes d'optimisation pour l'aide à la décision");
      expect(module.coefficient).toBe(0.7);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[8];
      expect(module.code).toBe("R5.A.12");
      expect(module.name).toBe("Modélisations mathématiques");
      expect(module.coefficient).toBe(1.2);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(1);

      const exam = module.exams[0];
      expect(exam.date).toBeNull();
      expect(exam.average).toBeNull();
      expect(exam.globalAverage).toBeNull();
      expect(exam.coefficient).toBe(1.0);
      expect(exam.name).toBe("Moyenne");
    }

    {
      const module = unit.modules[9];
      expect(module.code).toBe("R5.A.14");
      expect(module.name).toBe("Anglais");
      expect(module.coefficient).toBe(0.4);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }

    {
      const module = unit.modules[10];
      expect(module.code).toBe("S5.A.01");
      expect(module.name).toBe("Développement avancé");
      expect(module.coefficient).toBe(5.0);
      expect(module.average).toBeNull();
      expect(module.exams).toBeArrayOfSize(0);
    }
  });

  it("should parse the 6th semester metadata", () => {
    const semester = report.semesters[1];
    expect(semester.name).toBe("Semestre 6");
    expect(semester.units).toBeArrayOfSize(3);
  });
});
