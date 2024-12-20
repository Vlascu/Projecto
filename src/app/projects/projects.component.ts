import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projects: any[] = [];
  showUploadModal = false;
  showPhotosModal = false;
  showLargeImageModal = false;
  currentProject: any = null;
  largeImageUrl: string = '';

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.fetchProjectsFromDB();
  }

  fetchProjectsFromDB() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects fetched from the DB:', this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects from DB:', err);
      },
    });
  }

  fetchProjects() {

    const token = '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = '';

    this.http.get<any[]>(apiUrl, { headers }).subscribe({
      next: (data) => {

        this.projects = data.map((repo) => ({
          name: repo.name,
          description: repo.description || 'No description available',
          html_url: repo.html_url,
          languages_url: repo.languages_url,
          languages: [],
        }));

        this.projects.forEach((project) => {
          this.http.get(project.languages_url, { headers }).subscribe({
            next: (languages) => {
              const totalBytes = Object.values(languages).reduce(
                (sum, bytes) => sum + (bytes as number),
                0
              );

              project.languages = Object.entries(languages).map(([name, bytes]) => ({
                name,
                percentage: ((bytes as number) / totalBytes) * 100,
              }));

              this.projectService.saveProject(project).subscribe({
                next: () => {
                  console.log(`Project ${project.name} saved to DB.`);
                },
                error: (err) => {
                  console.error(`Error saving project ${project.name}:`, err);
                },
              });
            },
            error: (err) => {
              console.error(`Error fetching languages for project ${project.name}:`, err);
            },
          });
        });


      },
      error: (err) => {
        console.error('Error fetching repositories:', err);
      },
    });
  }

  getLanguageLogos(language: string): string[] {
    const languageLogos: { [key: string]: string } = {
      JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      Bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      QMake: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg',
    };
    return languageLogos[language] ? [languageLogos[language]] : [];
  }

  openUploadModal(project: any) {
    this.currentProject = project;
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
    this.currentProject = null;
  }

  openPhotosModal(project: any) {
    this.currentProject = project;
    this.showPhotosModal = true;

    this.projectService.getImagesForProject(project.name).subscribe({
      next: (images) => {
        this.currentProject.photos = images.map((image) => image.image);
      },
      error: (err) => {
        console.error(`Error fetching images for project ${project.name}:`, err);
      },
    });
  }

  goToProject(githubUrl: string): void {
    console.log(this.projects);

    if (githubUrl) {
      window.open(githubUrl, '_blank');
    } else {
      console.warn('No GitHub URL provided for this project.');
    }
  }

  closePhotosModal() {
    this.showPhotosModal = false;
    this.currentProject = null;
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    this.handleFileUpload(files);
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    this.handleFileUpload(files);
  }

  handleFileUpload(files: FileList) {

    console.log(files);

    const uploadedPhotos = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(uploadedPhotos).then((photos) => {
      if (this.currentProject) {
        this.currentProject.photos = [...(this.currentProject.photos || []), ...photos];

        photos.forEach((photo) => {
          this.projectService.saveImage(this.currentProject.name, photo).subscribe({
            next: () => {
              console.log(`Image saved for project ${this.currentProject.name}`);
            },
            error: (err) => {
              console.error(`Error saving image for project ${this.currentProject.name}:`, err);
            },
          });
        });
      }
    });
  }

  openLargeImage(photoUrl: string) {
    this.largeImageUrl = photoUrl;
    this.showLargeImageModal = true;
  }

  closeLargeImageModal() {
    this.showLargeImageModal = false;
  }
}
